import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getNominations } from "@/lib/data/nomination.data";
import formatTimeAgo from "@/utils/formatTimeAgo";
import { TimerReset } from "lucide-react";

const StatisticsPage = async () => {
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth());
  const { data: newNominations } = await getNominations(startDate);

  return (
    <div>
      <div className="text-xl font-semibold mx-2">
        Thống kê từ {startDate.toLocaleDateString()}
      </div>
      <Separator className="m-2" />
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-2">
              <CardHeader className="pb-2">
                <CardDescription className="text-lg">Thu nhập</CardDescription>
                <CardTitle className="flex justify-between">
                  <div className="text-4xl">
                    123.456
                    <span className="text-xl">đ</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <div>1 lượt đọc = 5đ</div>
                    <div>1 đề cử = 100đ</div>
                  </div>
                </CardTitle>
              </CardHeader>
              <Separator className="my-2" />
              <CardFooter className="-mb-4 gap-1 text-sm">
                <TimerReset size={16} />
                update: 20:30 am
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="text-lg">Lượt đọc</CardDescription>
                <CardTitle className="text-4xl">32.123</CardTitle>
              </CardHeader>
              <Separator className="my-2" />
              <CardFooter className="-mb-4 gap-1 text-sm">
                <TimerReset size={16} />
                update: 20:30 am
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="text-lg">Đề cử</CardDescription>
                <CardTitle className="text-4xl">
                  {newNominations?.length || 0}
                </CardTitle>
              </CardHeader>
              <Separator className="my-2" />
              <CardFooter className="-mb-4 gap-1 text-sm">
                <TimerReset size={16} />
                update: 20:30 am
              </CardFooter>
            </Card>
          </div>
          <div>chart</div>
        </div>
        <div>
          <ScrollArea className="h-[560px] rounded-md border">
            <div className="p-4">
              <h4 className="mb-4 text-sm font-medium leading-none">
                Đề cử mới
              </h4>

              <div className="space-y-2">
                {newNominations?.map((nomination: any, index: number) => (
                  <div
                    key={index}
                    className="border-[1px] rounded-lg p-2 gap-2 flex"
                  >
                    <div className="flex-1 text-sm space-y-2">
                      <div>
                        Đọc giả: {nomination.user.firstName}{" "}
                        {nomination.user.lastName}
                      </div>
                      <div>Truyện: {nomination.novel.novelName}</div>
                    </div>
                    <div className="flex items-end">
                      <div className="text-xs mb-[2px]">
                        {formatTimeAgo(nomination.updatedAt)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>
      </main>
    </div>
  );
};

export default StatisticsPage;
