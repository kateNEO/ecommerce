function ProfileValueItem({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) {
  return (
    <div className=" w-7/8 flex justify-between gap-1 items-center">
      <span className="text-left text-sm leading-8 text-[#545454]">
        {label}
      </span>
      <div className="border border-[#9F9F9F] w-3/5 h-10 rounded-[7px] p-3 leading-none text-sm text-[#545454] truncate">
        {value}
      </div>
    </div>
  );
}
export default ProfileValueItem;
