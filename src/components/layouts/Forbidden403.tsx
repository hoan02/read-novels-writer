// "use client";

import { OrganizationSwitcher } from "@clerk/nextjs";

const Forbidden403 = () => {
  return (
    <div className="w-screen h-screen bg-[#342643] text-center flex items-center justify-center">
      <div>
        <div className="text-[5em] font-bold text-[#EE4B5E]" data-content="404">
          403 - ACCESS DENIED
        </div>
        <div className="text-[40px] font-bold text-[#1FA9D6]">
          Oops, You don't have permission to access this page!!!
        </div>
        <div className="mt-10 text-gray-300">
          <p>
            Chỉ có <span className="font-semibold">nhà viết truyện</span> mới có
            quyền truy cập vào nội dung này!
          </p>
          <p className="text-center">
            Nếu bạn muốn trở thành
            <span className="font-semibold"> nhà viết truyện</span> hãy liên hệ
            với:
            <a
              href="mailto:lehoan.dev@gmail.com"
              className="text-yellow-300 underline mx-1"
            >
              lehoan.dev@gmail.com
            </a>
            để được cấp quyền.
          </p>
          <div className="flex gap-2 justify-center my-4 items-center">
            <div>Bạn đã được cấp quyền? Hãy chuyển ngay</div>
            <OrganizationSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forbidden403;
