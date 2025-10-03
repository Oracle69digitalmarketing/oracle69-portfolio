import { NextResponse } from "next/server"

// 👇 ensure runtime fetch on Vercel
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN

    const res = await fetch(
      "https://api.github.com/users/Oracle69digitalmarketing/repos?sort=updated&per_page=12",
      {
        headers: {
          ...(token ? { Authorization: `token ${token}` } : {}),
          Accept: "application/vnd.github+json",
          "User-Agent": "oracle69-portfolio",
        },
        cache: "no-store", // disable caching during build
      }
    )

    if (!res.ok) {
      const text = await res.text()
      console.error("GitHub API error:", res.status, text)
      return NextResponse.json(
        {
          error: "Failed to fetch repos",
          status: res.status,
          details: text.slice(0, 200), // prevent giant logs
        },
        { status: res.status }
      )
    }

    const repos = await res.json()

    // ensure consistent shape for frontend
    const formatted = (Array.isArray(repos) ? repos : []).map((r: any) => ({
      id: r.id,
      name: r.name,
      description: r.description ?? "",
      html_url: r.html_url,
      homepage: r.homepage,
      language: r.language,
      stargazers_count: r.stargazers_count ?? 0,
      topics: Array.isArray(r.topics) ? r.topics : [],
    }))

    return NextResponse.json(formatted, { status: 200 })
  } catch (error: any) {
    console.error("Server error fetching GitHub repos:", error?.message || error)
    return NextResponse.json(
      { error: "Internal server error", details: error?.message || String(error) },
      { status: 500 }
    )
  }
}
