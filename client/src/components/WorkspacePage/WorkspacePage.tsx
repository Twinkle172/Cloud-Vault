import "./WorkspacePage.css";
import type { ReactNode } from "react";

interface WorkspaceStat {
  label: string;
  value: string;
}

interface WorkspacePageProps {
  title: string;
  eyebrow?: string;
  subtitle: string;
  stats?: WorkspaceStat[];
  children?: ReactNode;
}

const WorkspacePage = ({
  title,
  eyebrow,
  subtitle,
  stats = [],
  children,
}: WorkspacePageProps) => {
  return (
    <main className="workspacePage">
      <section className="workspaceHero glass">
        <div>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>

        {stats.length > 0 && (
          <div className="workspaceStats">
            {stats.map((stat) => (
              <div className="workspaceStat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {children}
    </main>
  );
};

export default WorkspacePage;
