import React from "react";
import type { Payload } from "payload";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import Link from "next/link";

export async function AnalyticsDashboard(props?: { payload?: Payload }) {
  let payload = props?.payload;
  if (!payload) {
    payload = await getPayload({ config: configPromise });
  }

  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );
  const startOfWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  let totalClicks = 0;
  let todayClicks = 0;
  let weekClicks = 0;
  let monthClicks = 0;
  let recentClicks: Array<{
    id: string | number;
    buttonLocation?: string;
    page?: string;
    device?: string;
    createdAt: string;
  }> = [];
  const buttonStats: Record<string, number> = {};
  const pageStats: Record<string, number> = {};
  const deviceStats: Record<string, number> = {
    mobile: 0,
    desktop: 0,
    tablet: 0,
  };

  try {
    const [totalRes, todayRes, weekRes, monthRes, docsRes] = await Promise.all([
      payload.count({ collection: "whatsapp-clicks" }),
      payload.count({
        collection: "whatsapp-clicks",
        where: {
          createdAt: { greater_than_equal: startOfToday.toISOString() },
        },
      }),
      payload.count({
        collection: "whatsapp-clicks",
        where: { createdAt: { greater_than_equal: startOfWeek.toISOString() } },
      }),
      payload.count({
        collection: "whatsapp-clicks",
        where: {
          createdAt: { greater_than_equal: startOfMonth.toISOString() },
        },
      }),
      payload.find({
        collection: "whatsapp-clicks",
        limit: 200,
        sort: "-createdAt",
      }),
    ]);

    totalClicks = totalRes.totalDocs;
    todayClicks = todayRes.totalDocs;
    weekClicks = weekRes.totalDocs;
    monthClicks = monthRes.totalDocs;

    recentClicks = docsRes.docs as typeof recentClicks;

    // Aggregate button & page stats
    for (const doc of docsRes.docs) {
      const loc = (doc.buttonLocation as string) || "Unknown Button";
      buttonStats[loc] = (buttonStats[loc] || 0) + 1;

      const page = (doc.page as string) || "/";
      pageStats[page] = (pageStats[page] || 0) + 1;

      const dev = (doc.device as string) || "desktop";
      deviceStats[dev] = (deviceStats[dev] || 0) + 1;
    }
  } catch (err) {
    console.error("Failed to load analytics dashboard data:", err);
  }

  const sortedButtons = Object.entries(buttonStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const sortedPages = Object.entries(pageStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const totalDeviceCount =
    (deviceStats.mobile || 0) +
      (deviceStats.desktop || 0) +
      (deviceStats.tablet || 0) || 1;
  const mobilePct = Math.round(
    ((deviceStats.mobile || 0) / totalDeviceCount) * 100,
  );
  const desktopPct = Math.round(
    ((deviceStats.desktop || 0) / totalDeviceCount) * 100,
  );

  return (
    <div
      style={{ marginBottom: "2rem", fontFamily: "var(--font-body, inherit)" }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.25rem",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span>💬 WhatsApp Lead Analytics</span>
          </h2>
          <p
            style={{
              margin: "0.25rem 0 0 0",
              opacity: 0.7,
              fontSize: "0.875rem",
            }}
          >
            Real-time click tracking across SaveMile website.
          </p>
        </div>
        <Link
          href="/admin/collections/whatsapp-clicks"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.85rem",
            fontWeight: "600",
            padding: "0.5rem 0.9rem",
            borderRadius: "0.5rem",
            backgroundColor: "#25D366",
            color: "#FFFFFF",
            textDecoration: "none",
          }}
        >
          View All Click Logs &rarr;
        </Link>
      </div>

      {/* Stats Cards Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        {/* Total Clicks */}
        <div
          style={{
            padding: "1.25rem",
            borderRadius: "0.75rem",
            border:
              "1px solid var(--theme-elevation-150, rgba(128,128,128,0.2))",
            backgroundColor:
              "var(--theme-elevation-50, rgba(128,128,128,0.05))",
          }}
        >
          <div
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              opacity: 0.7,
              fontWeight: "600",
            }}
          >
            Total Clicks
          </div>
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "800",
              marginTop: "0.4rem",
              color: "#FC532C",
            }}
          >
            {totalClicks.toLocaleString()}
          </div>
          <div
            style={{ fontSize: "0.75rem", opacity: 0.6, marginTop: "0.25rem" }}
          >
            All-time WhatsApp chats initiated
          </div>
        </div>

        {/* Today */}
        <div
          style={{
            padding: "1.25rem",
            borderRadius: "0.75rem",
            border:
              "1px solid var(--theme-elevation-150, rgba(128,128,128,0.2))",
            backgroundColor:
              "var(--theme-elevation-50, rgba(128,128,128,0.05))",
          }}
        >
          <div
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              opacity: 0.7,
              fontWeight: "600",
            }}
          >
            Today
          </div>
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "800",
              marginTop: "0.4rem",
              color: "#25D366",
            }}
          >
            {todayClicks.toLocaleString()}
          </div>
          <div
            style={{ fontSize: "0.75rem", opacity: 0.6, marginTop: "0.25rem" }}
          >
            Clicks since midnight
          </div>
        </div>

        {/* Last 7 Days */}
        <div
          style={{
            padding: "1.25rem",
            borderRadius: "0.75rem",
            border:
              "1px solid var(--theme-elevation-150, rgba(128,128,128,0.2))",
            backgroundColor:
              "var(--theme-elevation-50, rgba(128,128,128,0.05))",
          }}
        >
          <div
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              opacity: 0.7,
              fontWeight: "600",
            }}
          >
            Last 7 Days
          </div>
          <div
            style={{ fontSize: "2rem", fontWeight: "800", marginTop: "0.4rem" }}
          >
            {weekClicks.toLocaleString()}
          </div>
          <div
            style={{ fontSize: "0.75rem", opacity: 0.6, marginTop: "0.25rem" }}
          >
            This week&apos;s lead volume
          </div>
        </div>

        {/* This Month & Device */}
        <div
          style={{
            padding: "1.25rem",
            borderRadius: "0.75rem",
            border:
              "1px solid var(--theme-elevation-150, rgba(128,128,128,0.2))",
            backgroundColor:
              "var(--theme-elevation-50, rgba(128,128,128,0.05))",
          }}
        >
          <div
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              opacity: 0.7,
              fontWeight: "600",
            }}
          >
            This Month / Device
          </div>
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: "800",
              marginTop: "0.4rem",
            }}
          >
            {monthClicks.toLocaleString()}{" "}
            <span
              style={{ fontSize: "0.9rem", fontWeight: "400", opacity: 0.7 }}
            >
              leads
            </span>
          </div>
          <div
            style={{ fontSize: "0.75rem", opacity: 0.8, marginTop: "0.35rem" }}
          >
            📱 {mobilePct}% Mobile &nbsp;|&nbsp; 💻 {desktopPct}% Desktop
          </div>
        </div>
      </div>

      {/* Breakdown Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1rem",
        }}
      >
        {/* Top Buttons Card */}
        <div
          style={{
            padding: "1.25rem",
            borderRadius: "0.75rem",
            border:
              "1px solid var(--theme-elevation-150, rgba(128,128,128,0.2))",
            backgroundColor:
              "var(--theme-elevation-50, rgba(128,128,128,0.05))",
          }}
        >
          <h3
            style={{
              fontSize: "0.95rem",
              fontWeight: "700",
              margin: "0 0 0.9rem 0",
            }}
          >
            Top Converting Buttons
          </h3>
          {sortedButtons.length === 0 ? (
            <div
              style={{ fontSize: "0.85rem", opacity: 0.6, fontStyle: "italic" }}
            >
              No click data yet. Clicks will appear here.
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
              }}
            >
              {sortedButtons.map(([btn, count]) => {
                const pct = Math.round(
                  (count / (recentClicks.length || 1)) * 100,
                );
                return (
                  <div key={btn}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "0.8rem",
                        marginBottom: "0.2rem",
                      }}
                    >
                      <span style={{ fontWeight: "600" }}>{btn}</span>
                      <span style={{ opacity: 0.7 }}>
                        {count} clicks ({pct}%)
                      </span>
                    </div>
                    <div
                      style={{
                        height: "6px",
                        borderRadius: "3px",
                        backgroundColor:
                          "var(--theme-elevation-150, rgba(128,128,128,0.2))",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${pct}%`,
                          backgroundColor: "#FC532C",
                          borderRadius: "3px",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Top Pages Card */}
        <div
          style={{
            padding: "1.25rem",
            borderRadius: "0.75rem",
            border:
              "1px solid var(--theme-elevation-150, rgba(128,128,128,0.2))",
            backgroundColor:
              "var(--theme-elevation-50, rgba(128,128,128,0.05))",
          }}
        >
          <h3
            style={{
              fontSize: "0.95rem",
              fontWeight: "700",
              margin: "0 0 0.9rem 0",
            }}
          >
            Top Converting Pages
          </h3>
          {sortedPages.length === 0 ? (
            <div
              style={{ fontSize: "0.85rem", opacity: 0.6, fontStyle: "italic" }}
            >
              No click data yet.
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
              }}
            >
              {sortedPages.map(([page, count]) => {
                const pct = Math.round(
                  (count / (recentClicks.length || 1)) * 100,
                );
                return (
                  <div key={page}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "0.8rem",
                        marginBottom: "0.2rem",
                      }}
                    >
                      <span
                        style={{ fontWeight: "600", fontFamily: "monospace" }}
                      >
                        {page}
                      </span>
                      <span style={{ opacity: 0.7 }}>
                        {count} clicks ({pct}%)
                      </span>
                    </div>
                    <div
                      style={{
                        height: "6px",
                        borderRadius: "3px",
                        backgroundColor:
                          "var(--theme-elevation-150, rgba(128,128,128,0.2))",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${pct}%`,
                          backgroundColor: "#25D366",
                          borderRadius: "3px",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent 5 Clicks Activity */}
        <div
          style={{
            padding: "1.25rem",
            borderRadius: "0.75rem",
            border:
              "1px solid var(--theme-elevation-150, rgba(128,128,128,0.2))",
            backgroundColor:
              "var(--theme-elevation-50, rgba(128,128,128,0.05))",
          }}
        >
          <h3
            style={{
              fontSize: "0.95rem",
              fontWeight: "700",
              margin: "0 0 0.9rem 0",
            }}
          >
            Recent Clicks
          </h3>
          {recentClicks.length === 0 ? (
            <div
              style={{ fontSize: "0.85rem", opacity: 0.6, fontStyle: "italic" }}
            >
              No clicks recorded yet.
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {recentClicks.slice(0, 5).map((item) => {
                const timeAgo = new Date(item.createdAt).toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  },
                );
                const dateStr = new Date(item.createdAt).toLocaleDateString(
                  [],
                  {
                    month: "short",
                    day: "numeric",
                  },
                );
                return (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "0.78rem",
                      padding: "0.35rem 0",
                      borderBottom:
                        "1px solid var(--theme-elevation-100, rgba(128,128,128,0.1))",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: "600" }}>
                        {item.buttonLocation || "WhatsApp Button"}
                      </div>
                      <div
                        style={{
                          opacity: 0.6,
                          fontFamily: "monospace",
                          fontSize: "0.72rem",
                        }}
                      >
                        {item.page || "/"}
                      </div>
                    </div>
                    <div
                      style={{
                        textAlign: "right",
                        opacity: 0.7,
                        fontSize: "0.72rem",
                      }}
                    >
                      <div>
                        {item.device === "mobile" ? "📱 Mobile" : "💻 Desktop"}
                      </div>
                      <div>
                        {dateStr} {timeAgo}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
