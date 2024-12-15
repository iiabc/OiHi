import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons";
import { BellIcon, BotMessageSquare, Share2Icon } from "lucide-react";

import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "../ui/bento-grid";
import Marquee from "../ui/marquee";
import { AnimatedListFeatures } from "./auth-animated";

// 评论内容
const aiComments = [
    "今天向AI咨询了一个简单的问题，得到了快速的答案，很实用！",
    "问了AI一个关于健康的小问题，它给出的建议很简洁明了，挺有帮助的。",
    "AI帮我解答了一个简单的疑惑，响应非常迅速，感觉很方便。",
    "与AI对话让我轻松解决了一个问题，提供的建议简单易懂，挺实用的。",
    "今天请教了AI一个问题，它的回答虽然简单，但完全解决了我的困惑。",
    "AI的建议非常简洁直接，虽然没有深入分析，但足够解决我眼前的问题。",
    "我问了AI一些日常问题，它给出了直接的解决方案，挺实用的。",
    "向AI咨询了一个小问题，得到的建议快速而有效，省了不少时间。",
    "和AI的交流让我的问题很快得到了解答，虽然简单，但很有帮助。",
    "AI给出的建议非常简洁，帮助我快速找到了问题的解决办法。"
  ];
  

const features = [
  {
    Icon: Share2Icon,
    name: "用户声音",
    description: "浏览并了解用户的评论和体验",
    href: "#",
    cta: "评论",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      >
        {aiComments.map((comment, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white">
                  {comment}
                </figcaption>
              </div>
            </div>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: BotMessageSquare,
    name: "解答疑惑",
    description: "直接提问，快速得到解答",
    href: "#",
    cta: "功能",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedListFeatures className="absolute right-2 top-4 h-[300px] w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
];

export function BentoAuth() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}
