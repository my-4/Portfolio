// 项目内容类型定义
export interface ProjectContent {
  type: 'text' | 'image' | 'heading' | 'heading2' | 'heading3' | 'heading4' | 'video' | 'interactive';
  value: string;
  // 可选属性
  alt?: string;      // 图片/视频的 alt 文本
  caption?: string;  // 图片/视频的说明文字
  width?: number;    // 视频/交互内容的宽度
  height?: number;   // 视频/交互内容的高度
}

// 标签接口定义
export interface ProjectTag {
  name: string;
  category: 'technology' | 'tool' | 'design' | 'methodology'; // 技术、工具、设计、方法论
}

// 项目接口定义
export interface Project {
  // 预览信息
  id: number;
  slug: string; // 项目文件夹名称（用于文件路径，建议使用英文或拼音）
  title: string;
  category: 'interaction' | 'service' | 'product' | 'visual';
  year: string;
  description: string;
  coverImage: string;
  tags: ProjectTag[]; // 项目标签
  responsibilities?: string[]; // 核心职责/分工
  
  // 详细信息
  fullContent: ProjectContent[];
}

// 项目数据
export const projects: Project[] = [
  {
    id: 1,
    slug: "drone-control",
    title: "复杂林地环境下的无人机集群手势交互系统",
    category: "interaction",
    year: "2025",
    description: "一套面向密林侦察打击场景的无人机集群控制系统，通过“所见即所得”的拟态映射与严密的状态机逻辑，实现了从“操纵”到“指挥”的维度降维，解决了单兵集群操控中的认知负荷与肌肉疲劳问题 。",
    coverImage: "/projects/drone-control/images/cover.jpg",
    tags: [
      { name: "Python", category: "technology" },
      { name: "OpenCV", category: "tool" },
      { name: "UE5", category: "tool" },
      { name: "Embodied Interaction", category: "design" },
      { name: "Gesture Recognition", category: "design" },
    ],
    responsibilities: [
      "交互逻辑定义",
      "手势语义设计",
      "视觉算法实现"
    ],
    fullContent: [
      {
        type: "heading2",
        value: "项目概述"
      },
      {
        type: "text",
        value: `本项目针对 边境密林环境（GPS 拒止/视线遮挡） 下的战术需求，构建了一套从视觉感知到仿真执行的全链路交互系统。 传统操纵杆难以同时兼顾多机姿态，且操作手需时刻保持持枪警戒。本系统利用计算机视觉技术，采用 "抽象指令具象化" 的策略，建立了一套符合人类认知的"肢体-飞行"映射语言，支持单兵在行进间完成从隐蔽渗透到精确打击的全流程指挥。`
      },
      {
        type: "image",
        value: "/projects/drone-control/images/image-1.png"
      },
      {
        type: "heading",
        value: "成果展示"
      },
      {
        type: "heading3",
        value: `成果一：低认知负荷的"直觉映射手势库"`
      },
      {
        type: "text",
        value: `针对不同类型的战术指令，采用差异化的映射策略，建立"空间同构"与"物理隐喻"的双重认知模型，降低记忆成本。
- **队形控制——空间拟态**：利用手势的物理形状直接模拟集群的空间排列，实现  **"所见即所得"**  。
- **参数控制——物理隐喻**：将抽象的飞行状态转化为具有指向性或象征义的肢体动作 。`
      },
      {
        type: "image",
        value: "/projects/drone-control/images/image-3.png"
      },
      {
        type: "heading3",
        value: `成果二：抗疲劳的“离散-连续”混合架构`
      },
      {
        type: "text",
        value: `针对“大猩猩手臂”效应 ，通过有限状态机对左右手进行 **交互维度的解耦**，平衡了战术灵活性与生理极限。
- **左手：离散策略层** 
  定义为“脉冲触发”。负责模式切换（悬停/巡航/调速/选机），指令触发后系统即 **锁定状态**，操作员可放下手臂回归持枪姿态。
- **右手：连续战术层**
  定义为“实时控制”。仅在需要越障或微调时介入，将手腕的 **Pitch/Yaw** 角度实时映射为无人机的升降与转向。`
      },
      {
        type: "heading3",
        value: `成果三：高鲁棒性的工程落地验证`
      },
      {
        type: "text",
        value: `通过 Python 脚本实现了一套抗噪算法，确保视觉识别在复杂环境下的可用性。
- **时域防抖** ：引入 **10 帧滑动窗口** 校验机制，只有同一手势连续稳定出现才判定为有效，消除帧间跳变。
- **死区设计**：设定 Pitch/Yaw 的中心死区（如 Pitch \> +5° 下降，\< -10° 上升），考虑到人体感知到的“平面”与计算机视觉检测到的“平面”存在一定差距，同时过滤掉无意识的轻微手臂颤动。
- **反馈机制**：设计 AR 界面提供瞬时文字反馈（如 "SPEED SET: 3"），确认指令已接收，解决视觉识别缺乏触觉反馈的问题。`
      },
      {
        type: "video",
        value: "/projects/drone-control/videos/demo.mp4"
      }
    ]
  }
];
