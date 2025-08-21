import TwitterIcon from '../assets/social/Twitter.svg?react';
import FacebookIcon from '../assets/social/Facebook.svg?react';
import InstagramIcon from '../assets/social/Instagram.svg?react';
import TiktokIcon from '../assets/social/Tiktok.svg?react';

const socialLinks = [
  {
    href: 'https://twitter.com',
    icon: <TwitterIcon className="w-5 h-5" />,
    name: 'Twitter',
  },
  {
    href: 'https://facebook.com',
    icon: <FacebookIcon className="w-5 h-5" />,
    name: 'Facebook',
  },
  {
    href: 'https://tiktok.com',
    icon: <TiktokIcon className="w-5 h-5" />,
    name: 'Tiktok',
  },
  {
    href: 'https://instagram.com',
    icon: <InstagramIcon className="w-5 h-5" />,
    name: 'Instagram',
  },
];

export function Footer() {
  return (
    <footer
      id="contact"
      className="bg-black text-white py-12 sm:px-4 md:px-8 xl:px-40"
    >
      <div className="md:flex md:justify-between gap-8 max-w-[1120px] mx-auto px-4 space-y-8 md:space-y-0">
        {/* Левая колонка */}
        <div>
          <h2 className="text-xl font-bold mb-4">cyber</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            We are a residential interior design firm located
            <br /> in Portland. Our boutique-studio offers more than
          </p>
        </div>

        {/*  Services */}
        <div>
          <h3 className="font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="#">Bonus program</a>
            </li>
            <li>
              <a href="#">Gift cards</a>
            </li>
            <li>
              <a href="#">Credit and payment</a>
            </li>
            <li>
              <a href="#">Service contracts</a>
            </li>
            <li>
              <a href="#">Non-cash account</a>
            </li>
            <li>
              <a href="#">Payment</a>
            </li>
          </ul>
        </div>

        {/*  Assistance */}
        <div>
          <h3 className="font-semibold mb-4">Assistance to the buyer</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="#">Find an order</a>
            </li>
            <li>
              <a href="#">Terms of delivery</a>
            </li>
            <li>
              <a href="#">Exchange and return of goods</a>
            </li>
            <li>
              <a href="#">Guarantee</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">Terms of use</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Соцсети  */}
      <div className="mt-12 flex justify-center gap-6">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name}
            className="p-2 rounded-full hover:bg-[#9a2ee8] active:bg-[#54306d] transition-colors duration-200"
          >
            {link.icon}
          </a>
        ))}
      </div>
    </footer>
  );
}
