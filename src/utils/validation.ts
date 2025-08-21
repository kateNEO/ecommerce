import { z } from 'zod';
export const CountryEnum = z.enum([
  'United States (US)',
  'European (EU)',
  'Belarus(BY)',
  'Russia(RU)',
]);
export type Country = z.infer<typeof CountryEnum>;
const postalCodePatterns: Record<string, RegExp> = {
  'United States (US)': /^\d{5}$/,
  'European (EU)': /^[A-Z0-9\s-]{3,10}$/i,
  'Belarus(BY)': /^\d{6}$/,
  'Russia(RU)': /^\d{6}$/,
};
export const schemaForLogin = z.object({
  email: z
    .string()
    //.email({ message: 'Wrong email' }),
    .refine((val) => val === val.trim(), {
      message: 'Email must not contain leading or trailing whitespace',
    })
    .superRefine((val: string, ctx: z.RefinementCtx) => {
      if (!val.includes('@')) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Email must contain @ symbol',
          path: [],
        });
      }
      const [str, domain] = val.split('@');
      if (!domain || domain.trim() === '' || !domain.includes('.')) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Email must contain domain name',
        });
      }
      if (!str) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Wrong email',
        });
      }
      if (!/\.[a-zA-Z]{2,}$/.test(domain)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Wrong domain format',
        });
      }
      if (/\s/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Email must not contain whitespace',
        });
      }
    }),
  password: z
    .string()
    .min(8, { message: 'Password must contain at least 8 characters' })
    .refine((val) => /[A-Z]/.test(val), {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine((val) => /[a-z]/.test(val), {
      message: 'Password must contain at least one lowercase letter',
    })
    .refine((val) => !/\s/.test(val), {
      message: 'Password must not contain leading or trailing whitespace',
    })
    .refine((val) => /[0-9]/.test(val), {
      message: 'Password must contain at least one digit',
    })
    .refine((val) => /[^A-Za-z0-9]/.test(val), {
      message: 'Password must contain at least one special symbol',
    }),
});
export const schemaForAddress = z
  .object({
    streetName: z
      .string()
      .min(1, { message: 'Field must contain at least one letter' }),
    city: z
      .string()
      .min(1, { message: 'Field must contain at least one letter' })
      .refine((val) => !/[^A-Za-z]/.test(val), {
        message: 'Field must not contain digits and special symbols',
      }),
    country: CountryEnum,
    postalCode: z
      .string()
      .min(1, { message: 'Field must contain at least one letter' }),
  })
  .superRefine((data, ctx) => {
    if (!validatePC(data.country, data.postalCode)) {
      console.log(validatePC(data.country, data.postalCode));
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Wrong postal code format for billing address',
        path: ['postalCode'],
      });
    }
  });
export const schemaForRegistrationBase = schemaForLogin.extend({
  firstName: z
    .string()
    .min(1, { message: 'Field must contain at least one letter' })
    .refine((val) => !/[^A-Za-z]/.test(val), {
      message: 'Field must not contain digits and special symbols',
    }),
  lastName: z
    .string()
    .min(1, { message: 'Field must contain at least one letter' })
    .refine((val) => !/[^A-Za-z]/.test(val), {
      message: 'Field must not contain digits and special symbols',
    }),
  dateOfBirth: z
    .string()
    .min(1, { message: 'Add your birth date' })
    .refine(
      (val) => {
        const birthDate = new Date(val);
        const now = new Date();
        return birthDate <= now;
      },
      {
        message: 'Wrong date',
      }
    )
    .refine(
      (val) => {
        const birthDate = new Date(val);
        const now = new Date();

        const thirteenYearsAgo = new Date(
          now.getFullYear() - 13,
          now.getMonth(),
          now.getDate()
        );

        return birthDate <= thirteenYearsAgo;
      },
      {
        message: 'You must be over 13 years old',
      }
    ),
});

export const schemaForRegistration = schemaForRegistrationBase
  .extend({
    shippingAddress: schemaForAddress,
    saveAsBilling: z.boolean(),
    billingAddress: z.union([schemaForAddress, z.undefined()]).optional(),
  })

  .superRefine((data, ctx) => {
    if (
      !validatePC(data.shippingAddress.country, data.shippingAddress.postalCode)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Wrong postal code format for shipping address',
        path: ['shippingAddress', 'postalCode'],
      });
    }
    if (!data.saveAsBilling) {
      if (!data.billingAddress) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Billing address is required if not saved as shipping',
          path: ['billingAddress'],
        });
      } else {
        if (
          !validatePC(
            data.billingAddress.country,
            data.billingAddress.postalCode
          )
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Wrong postal code format for billing address',
            path: ['billingAddress', 'postalCode'],
          });
        }
      }
    }
  });

function validatePC(country: string, postalCode: string): boolean {
  const pattern = postalCodePatterns[country];
  return pattern.test(postalCode);
}
export const schemaForEditUserInfo = schemaForRegistrationBase.omit({
  password: true,
});
export const schemaForPasswordOnly = schemaForLogin.omit({ email: true });
