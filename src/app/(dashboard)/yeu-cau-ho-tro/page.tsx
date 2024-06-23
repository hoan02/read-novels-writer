const TicketsPage = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full">
      <h2 className="text-2xl font-bold mb-6 text-center">Hỗ trợ từ đội ngũ</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Liên hệ:</h3>
          <p className="text-gray-600">
            Để được hỗ trợ, vui lòng liên hệ chúng tôi qua email sau:
          </p>
          <p className="text-blue-500">lehoan.dev@gmail.com</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700">
            Hướng dẫn hỗ trợ:
          </h3>
          <ul className="list-disc list-inside text-gray-600">
            <li>
              Kiểm tra kỹ lưỡng các thông tin trước khi gửi yêu cầu hỗ trợ.
            </li>
            <li>
              Gửi email với tiêu đề rõ ràng và mô tả chi tiết vấn đề bạn gặp
              phải.
            </li>
            <li>Chúng tôi sẽ phản hồi bạn trong vòng 24-48 giờ làm việc.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700">
            Các kênh hỗ trợ khác:
          </h3>
          <p className="text-gray-600">
            Ngoài email, bạn cũng có thể liên hệ qua các kênh sau:
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li>
              Facebook:{" "}
              <a
                href="https://facebook.com/yourpage"
                className="text-blue-500 hover:underline"
              >
                facebook.com/yourpage
              </a>
            </li>
            <li>
              Zalo:{" "}
              <a
                href="https://zalo.me/yourid"
                className="text-blue-500 hover:underline"
              >
                zalo.me/yourid
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TicketsPage;
