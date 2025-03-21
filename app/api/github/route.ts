import { type NextRequest, NextResponse } from "next/server"

// This is a mock implementation - in a real app, you would use the GitHub API
export async function GET(request: NextRequest) {
  try {
    const username = request.nextUrl.searchParams.get("username")

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 })
    }

    // In a real implementation, you would make a request to the GitHub API
    // using the provided token for authentication if available

    // Mock data for demonstration purposes
    const mockGitHubProfile = {
      name: "John Doe",
      bio: "Software engineer passionate about open source",
      location: "San Francisco, CA",
      email: "john.doe@example.com",
      company: "Tech Innovations Inc.",
      blog: "https://johndoe.dev",
      repos: [
        {
          name: "awesome-project",
          description: "A scalable React application with TypeScript",
          language: "TypeScript",
          stargazers_count: 128,
          html_url: "https://github.com/johndoe/awesome-project",
        },
        {
          name: "node-api-starter",
          description: "Starter template for Node.js APIs with Express",
          language: "JavaScript",
          stargazers_count: 87,
          html_url: "https://github.com/johndoe/node-api-starter",
        },
        {
          name: "data-visualization-toolkit",
          description: "Tools for creating interactive data visualizations",
          language: "JavaScript",
          stargazers_count: 54,
          html_url: "https://github.com/johndoe/data-visualization-toolkit",
        },
        {
          name: "python-ml-examples",
          description: "Examples of machine learning algorithms in Python",
          language: "Python",
          stargazers_count: 42,
          html_url: "https://github.com/johndoe/python-ml-examples",
        },
        {
          name: "docker-compose-templates",
          description: "Ready-to-use Docker Compose templates for various applications",
          language: "Dockerfile",
          stargazers_count: 36,
          html_url: "https://github.com/johndoe/docker-compose-templates",
        },
      ],
      languages: ["TypeScript", "JavaScript", "Python", "Docker", "HTML", "CSS"],
    }

    return NextResponse.json(mockGitHubProfile)
  } catch (error) {
    console.error("GitHub API error:", error)
    return NextResponse.json({ error: "Failed to fetch GitHub profile" }, { status: 500 })
  }
}

