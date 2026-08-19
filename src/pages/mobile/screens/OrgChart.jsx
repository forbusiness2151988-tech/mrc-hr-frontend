import { useState } from "react";
import Icon from "../components/Icon";
import { orgChart } from "../mockData";

function Node({ node, depth = 0 }) {
  const [open, setOpen] = useState(depth < 1);
  const hasChildren = node.children?.length > 0;

  return (
    <div className={depth > 0 ? "ml-4 border-l border-ink-100 pl-4" : ""}>
      <div className="rounded-2xl bg-white border border-ink-50 shadow-sm p-3.5 flex items-center gap-3 mb-2">
        <img src={node.avatar} alt={node.name} className="h-11 w-11 rounded-full object-cover" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-ink-900">{node.name}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[11px] font-medium rounded-full bg-ink-50 text-ink-500 px-2 py-0.5">
              {node.role}
            </span>
            <span className="text-[11px] text-ink-400">{node.branch}</span>
          </div>
        </div>
        {hasChildren && (
          <button onClick={() => setOpen((o) => !o)} className="flex flex-col items-center px-1">
            <span className="text-xs font-semibold text-ink-700 flex items-center gap-1">
              <Icon name="users" size={13} className="text-ink-400" />
              {node.directReports}
            </span>
            <Icon
              name="chevronDown"
              size={14}
              className={`text-ink-300 mt-0.5 transition ${open ? "rotate-180" : ""}`}
            />
          </button>
        )}
      </div>
      {hasChildren && open && (
        <div>
          {node.children.map((c) => (
            <Node key={c.name} node={c} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function OrgChart() {
  return (
    <div className="px-4 pb-6">
      <Node node={orgChart} />
    </div>
  );
}
