import { NextResponse } from "next/server"

// 👇 force Next.js to treat this API as dynamic
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    // secure server-side fetch; GITHUB_TOKEN must be set in Vercel (Project → Settings → Environment Variables)
    const res = await fetch(
      "https://api.github.com/users/Oracle69digitalmarketing/repos?sort=updated&per_page=12",
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
          "User-Agent": "oracle69-portfolio",
        },
        cache: "no-store", // ensure no ISR caching
      }
    )

    if (!res.ok) {
      const text = await res.text()
      console.error("GitHub API error:", res.status, text)
      return NextResponse.json(
        { error: "Failed to fetch repos" },
        { status: res.status }
      )
    }

    const repos = await res.json()

    // keep only the fields the frontend uses
    const formatted = (Array.isArray(repos) ? repos : []).map((r: any) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      html_url: r.html_url,
      homepage: r.homepage,
      language: r.language,
      stargazers_count: r.stargazers_count ?? 0,
      topics: Array.isArray(r.topics) ? r.topics : [],
    }))

    return NextResponse.json(formatted)
  } catch (error) {
    console.error("Server error fetching GitHub repos:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
