"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "../ui/animated-list";

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

let features = [
  {
    name: "简单咨询",
    description: "快速回答你的日常问题",
    time: "5分钟前",
    icon: "💬",
    color: "#FF3D71",
  },
  {
    name: "对话助手",
    description: "与AI进行简洁有效的对话",
    time: "10分钟前",
    icon: "🗣️",
    color: "#00C9A7",
  },
  {
    name: "图片识别",
    description: "智能识别并告诉你图片中的内容",
    time: "2分钟前",
    icon: "🐾",
    color: "#1E86FF",
  },
  {
    name: "简易建议",
    description: "基于问题提供简洁的解决建议",
    time: "15分钟前",
    icon: "💡",
    color: "#FFB800",
  },
  {
    name: "天气查询",
    description: "快速查询当天或未来几天的天气",
    time: "30分钟前",
    icon: "☀️",
    color: "#F4A261",
  },
  {
    name: "日程提醒",
    description: "帮助你管理日程并设置提醒",
    time: "20分钟前",
    icon: "📅",
    color: "#2D9CDB",
  },
  {
    name: "词汇翻译",
    description: "即时翻译多种语言的词汇和句子",
    time: "1小时前",
    icon: "🌐",
    color: "#6C63FF",
  },
  {
    name: "购物推荐",
    description: "根据兴趣推荐商品或优惠活动",
    time: "45分钟前",
    icon: "🛍️",
    color: "#00BFFF",
  },
  {
    name: "新闻摘要",
    description: "为你提供当天的新闻热点和摘要",
    time: "10分钟前",
    icon: "📰",
    color: "#FF6F61",
  },
  {
    name: "餐厅推荐",
    description: "根据位置和口味推荐附近餐厅",
    time: "25分钟前",
    icon: "🍽️",
    color: "#28A745",
  },
];

features = Array.from({ length: 10 }, () => features).flat();

const FeaturesInfo = ({ name, description, icon, color, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function AnimatedListFeatures({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full flex-col p-6 overflow-hidden rounded-lg border bg-background md:shadow-xl",
        className
      )}
    >
      <AnimatedList>
        {features.map((item, idx) => (
          <FeaturesInfo {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}
