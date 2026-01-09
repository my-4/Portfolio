// 项目内容类型定义
export interface ProjectContent {
  type: 'text' | 'image' | 'heading';
  value: string;
}

// 项目接口定义
export interface Project {
  // 预览信息
  id: number;
  title: string;
  category: 'interaction' | 'service' | 'product' | 'visual';
  year: string;
  description: string;
  coverImage: string;
  
  // 详细信息
  fullContent: ProjectContent[];
}

// Mock 数据
export const projects: Project[] = [
  {
    id: 1,
    title: "交互设计项目 - 智能家居控制界面",
    category: "interaction",
    year: "2024",
    description: "一个创新的智能家居控制界面设计，专注于用户体验和直观的操作流程。",
    coverImage: "https://placehold.co/600x400",
    fullContent: [
      {
        type: "heading",
        value: "项目概述"
      },
      {
        type: "text",
        value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
      },
      {
        type: "image",
        value: "https://placehold.co/800x500"
      },
      {
        type: "heading",
        value: "设计挑战"
      },
      {
        type: "text",
        value: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
      },
      {
        type: "heading",
        value: "解决方案"
      },
      {
        type: "text",
        value: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."
      },
      {
        type: "image",
        value: "https://placehold.co/800x500"
      }
    ]
  },
  {
    id: 2,
    title: "服务设计项目 - 城市出行体验优化",
    category: "service",
    year: "2024",
    description: "通过服务设计思维重新定义城市出行体验，整合多种交通方式，创造无缝的出行服务。",
    coverImage: "https://placehold.co/600x400",
    fullContent: [
      {
        type: "heading",
        value: "项目背景"
      },
      {
        type: "text",
        value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      },
      {
        type: "image",
        value: "https://placehold.co/800x500"
      },
      {
        type: "heading",
        value: "用户研究"
      },
      {
        type: "text",
        value: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
      {
        type: "heading",
        value: "服务蓝图"
      },
      {
        type: "text",
        value: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
      },
      {
        type: "image",
        value: "https://placehold.co/800x500"
      },
      {
        type: "heading",
        value: "实施成果"
      },
      {
        type: "text",
        value: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
      }
    ]
  },
  {
    id: 3,
    title: "产品设计项目 - 可持续生活方式应用",
    category: "product",
    year: "2024",
    description: "一款帮助用户追踪和改善个人碳足迹的移动应用，通过游戏化和社交功能鼓励可持续生活方式。",
    coverImage: "https://placehold.co/600x400",
    fullContent: [
      {
        type: "heading",
        value: "项目简介"
      },
      {
        type: "text",
        value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
      },
      {
        type: "image",
        value: "https://placehold.co/800x500"
      },
      {
        type: "heading",
        value: "核心功能"
      },
      {
        type: "text",
        value: "Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
      {
        type: "heading",
        value: "设计系统"
      },
      {
        type: "text",
        value: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
      },
      {
        type: "image",
        value: "https://placehold.co/800x500"
      },
      {
        type: "heading",
        value: "用户测试"
      },
      {
        type: "text",
        value: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet."
      },
      {
        type: "image",
        value: "https://placehold.co/800x500"
      },
      {
        type: "heading",
        value: "未来规划"
      },
      {
        type: "text",
        value: "Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."
      }
    ]
  }
];
