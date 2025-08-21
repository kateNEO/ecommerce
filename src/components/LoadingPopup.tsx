import PopupWrapper from './profile/PopupWrapper';

export function LoadingPopup({
  message = 'Adding to cart...',
}: {
  message?: string;
}) {
  return (
    <PopupWrapper>
      <div className="flex flex-col items-center">
        <div className="loader mb-4" />
        <p className="text-gray-700">{message}</p>
      </div>
    </PopupWrapper>
  );
}
