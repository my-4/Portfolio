# 项目文件组织说明

## 目录结构

每个项目应该有自己的文件夹，**使用项目的 slug 命名**（如 `smart-home-control`, `urban-travel-experience` 等）。

**slug 命名规则**：
- 使用英文或拼音
- 小写字母
- 用连字符（`-`）分隔单词
- 简洁易识别
- 例如：`smart-home-control`, `urban-travel`, `sustainable-app`

```
projects/
├── smart-home-control/         # 智能家居控制界面
│   ├── images/                 # 项目图片
│   │   ├── cover.jpg          # 封面图（必需）
│   │   ├── image-1.jpg        # 内容图片
│   │   ├── image-2.jpg
│   │   └── ...
│   ├── videos/                 # 项目视频（可选）
│   │   ├── demo.mp4
│   │   └── ...
│   └── interactive/            # 实时交互内容（可选）
│       └── index.html         # 交互演示页面
├── urban-travel-experience/    # 城市出行体验优化
│   ├── images/
│   └── ...
└── sustainable-lifestyle-app/  # 可持续生活方式应用
    ├── images/
    └── ...
```

## 文件路径引用

在 `app/data/projects.ts` 中引用文件时，**使用项目的 slug 作为文件夹名**，路径相对于 `public` 目录：

```typescript
{
  id: 1,
  slug: "smart-home-control",  // 项目文件夹名称
  title: "智能家居控制界面",
  coverImage: "/projects/smart-home-control/images/cover.jpg",
  fullContent: [
    {
      type: "image",
      value: "/projects/smart-home-control/images/image-1.jpg",
      alt: "项目截图 1",
      caption: "这是项目的第一个截图"
    },
    {
      type: "video",
      value: "/projects/smart-home-control/videos/demo.mp4",
      caption: "项目演示视频",
      width: "100%",
      height: 500
    },
    {
      type: "interactive",
      value: "/projects/smart-home-control/interactive/index.html",
      caption: "实时交互演示",
      width: "100%",
      height: 600
    }
  ]
}
```

**重要**：`slug` 字段必须与 `public/projects/` 下的文件夹名称完全一致！

## 支持的内容类型

### 1. 图片 (image)
- 格式：JPG, PNG, WebP 等
- 必需属性：`type: "image"`, `value: "/path/to/image.jpg"`
- 可选属性：`alt`, `caption`

### 2. 视频 (video)
- 格式：MP4, WebM 等
- 必需属性：`type: "video"`, `value: "/path/to/video.mp4"`
- 可选属性：`caption`, `width`, `height`

### 3. 交互内容 (interactive)
- 格式：HTML 文件
- 必需属性：`type: "interactive"`, `value: "/path/to/index.html"`
- 可选属性：`caption`, `width`, `height`

### 4. 文本 (text)
- **存储方式**：直接写在 `app/data/projects.ts` 文件中
- 必需属性：`type: "text"`, `value: "文本内容"`
- 示例：
  ```typescript
  {
    type: "text",
    value: "这是项目的详细描述文本..."
  }
  ```

### 5. 标题 (heading)
- **存储方式**：直接写在 `app/data/projects.ts` 文件中
- 必需属性：`type: "heading"`, `value: "标题文字"`
- 示例：
  ```typescript
  {
    type: "heading",
    value: "项目背景"
  }
  ```

## 文本内容存储说明

### 当前方式（推荐）：直接存储在 `projects.ts` 中

文本内容和标题**直接写在 `app/data/projects.ts` 文件的 `fullContent` 数组中**。

**优点**：
- ✅ 简单直接，无需额外文件
- ✅ 类型安全，TypeScript 支持
- ✅ 易于维护和修改
- ✅ 无需额外的文件读取逻辑

**示例**：
```typescript
// app/data/projects.ts
{
  id: 1,
  fullContent: [
    {
      type: "heading",
      value: "项目概述"
    },
    {
      type: "text",
      value: "这是项目的详细描述文本，可以写得很长..."
    },
    {
      type: "image",
      value: "/projects/1/images/image-1.jpg"
    },
    {
      type: "heading",
      value: "设计挑战"
    },
    {
      type: "text",
      value: "这是另一段描述文本..."
    }
  ]
}
```

### 替代方案：存储在单独的文件中（如文本较长）

如果你的文本内容非常长（比如几千字），可以考虑将文本存储在单独的文件中：

**目录结构**：
```
public/projects/
├── 1/
│   ├── content.md          # 文本内容（Markdown 格式）
│   └── images/
└── ...
```

然后在代码中动态读取文件内容（需要添加额外的处理逻辑）。

**建议**：对于大多数情况，直接在 `projects.ts` 中写文本内容是最简单有效的方式。

## 使用示例

将你的作品文件按照以下步骤组织：

1. **创建项目文件夹**：`public/projects/[项目slug]/`（如 `smart-home-control`）
2. **在 `app/data/projects.ts` 中添加项目信息**，包含 `slug` 字段
3. **上传封面图**：`public/projects/[项目slug]/images/cover.jpg`
4. **上传其他图片**：`public/projects/[项目slug]/images/image-1.jpg`, `image-2.jpg` 等
5. **上传视频（如有）**：`public/projects/[项目slug]/videos/demo.mp4`
6. **添加交互内容（如有）**：`public/projects/[项目slug]/interactive/index.html`
7. **在 `fullContent` 中引用上述文件路径**，使用 `/projects/[项目slug]/` 开头的路径

**slug 命名建议**：
- ✅ 使用英文或拼音：`smart-home-control`, `zhineng-jiaju`
- ✅ 小写字母
- ✅ 用连字符分隔：`urban-travel-experience`
- ❌ 避免空格：不要用 `smart home control`
- ❌ 避免特殊字符：不要用 `smart_home_control` 或 `smartHomeControl`
