export function AuthImagePattern({ title, subtitle, img }) {
  return (
    <>
      <div className="hidden lg:flex items-center justify-center p-12 ">
        <div className="max-w-md text-center">
          <div>
            <img src={img} className="w-[1000px] rounded" alt="" />
          </div>
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-xl">{subtitle}</p>
        </div>
      </div>
    </>
  );
}
