"use client";

import { useField } from "@payloadcms/ui";
import { type MouseEvent, useRef, useState } from "react";

import { coverage } from "@/lib/content";

const MAP_SRC = "/assets/images/indonesia-geo.svg";
const W = 1014;
const H = 405;

interface Branch {
  id?: string;
  city: string;
  x: number;
  y: number;
  types: string[];
}

interface MapPickerProps {
  path?: string;
}

export function MapPicker(props?: MapPickerProps) {
  const fieldPath = props?.path || "coverageBranches";
  const { value, setValue } = useField<Branch[]>({
    path: fieldPath,
  });

  const [clickedPos, setClickedPos] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [newCity, setNewCity] = useState("");
  const [isWarehouse, setIsWarehouse] = useState(false);
  const [isService, setIsService] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showJson, setShowJson] = useState(false);

  const svgRef = useRef<SVGSVGElement>(null);

  const activeBranches: Branch[] =
    Array.isArray(value) && value.length > 0
      ? value
      : (coverage.branches as Branch[]);

  const handleSvgClick = (e: MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const x = Math.round((clickX / rect.width) * W);
    const y = Math.round((clickY / rect.height) * H);

    if (selectedIndex !== null && activeBranches[selectedIndex]) {
      // Move selected pin to new position
      const updated = [...activeBranches];
      updated[selectedIndex] = {
        ...updated[selectedIndex],
        x,
        y,
      };
      setValue(updated);
    } else {
      setClickedPos({ x, y });
    }
  };

  const handleAddPin = () => {
    if (!clickedPos || !newCity.trim()) return;
    const types: string[] = [];
    if (isWarehouse) types.push("warehouse");
    if (isService) types.push("service");

    const newBranch: Branch = {
      city: newCity.trim(),
      x: clickedPos.x,
      y: clickedPos.y,
      types: types.length > 0 ? types : ["service"],
    };

    setValue([...activeBranches, newBranch]);

    // Reset form
    setNewCity("");
    setClickedPos(null);
  };

  const handleRemoveBranch = (index: number) => {
    const updated = activeBranches.filter((_, i) => i !== index);
    setValue(updated);
    if (selectedIndex === index) setSelectedIndex(null);
  };

  const handleUpdateBranchCity = (index: number, city: string) => {
    const updated = [...activeBranches];
    updated[index] = { ...updated[index], city };
    setValue(updated);
  };

  const handleToggleType = (index: number, type: "warehouse" | "service") => {
    const updated = [...activeBranches];
    const currentTypes = updated[index].types || [];
    let newTypes: string[];
    if (currentTypes.includes(type)) {
      newTypes = currentTypes.filter((t) => t !== type);
      if (newTypes.length === 0) newTypes = ["service"];
    } else {
      newTypes = [...currentTypes, type];
    }
    updated[index] = { ...updated[index], types: newTypes };
    setValue(updated);
  };

  const branches = activeBranches;

  return (
    <div
      style={{
        margin: "20px 0",
        padding: "20px",
        background: "#1c1c1c",
        borderRadius: "8px",
        color: "#fff",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          marginBottom: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h3
            style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: 600 }}
          >
            Interactive Map Location Picker ({branches.length} Pins)
          </h3>
          <p style={{ margin: 0, fontSize: "13px", color: "#aaa" }}>
            Click anywhere on the map to add a pin, or click an existing pin to
            select/move it. Remember to click &quot;Save&quot; in Payload to
            persist changes to database.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowJson(!showJson)}
          style={{
            padding: "4px 10px",
            background: "#333",
            color: "#ccc",
            border: "1px solid #555",
            borderRadius: "4px",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          {showJson ? "Hide Data" : "View JSON Data"}
        </button>
      </div>

      {/* SVG Map Canvas */}
      <div
        style={{
          position: "relative",
          background: "#111",
          borderRadius: "6px",
          overflow: "hidden",
          border: "1px solid #333",
        }}
      >
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          aria-label="Interactive Map Location Picker"
          onClick={handleSvgClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
            }
          }}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            cursor: "crosshair",
          }}
        >
          <title>Interactive Map Location Picker</title>
          <image href={MAP_SRC} x="0" y="0" width={W} height={H} />

          {/* Render Existing Pins */}
          {branches.map((b, idx) => {
            const isSelected = selectedIndex === idx;
            const hasWh = b.types?.includes("warehouse");

            return (
              // biome-ignore lint/a11y/useSemanticElements: SVG <g> cannot be replaced with <button>
              <g
                key={b.id || `${b.city}-${b.x}-${b.y}`}
                role="button"
                tabIndex={0}
                aria-label={`Select branch ${b.city}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(isSelected ? null : idx);
                  setClickedPos(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedIndex(isSelected ? null : idx);
                    setClickedPos(null);
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <circle
                  cx={b.x}
                  cy={b.y}
                  r={isSelected ? 14 : 9}
                  fill={hasWh ? "#fc3d04" : "#ff8c00"}
                  stroke={isSelected ? "#ffffff" : "#000000"}
                  strokeWidth={isSelected ? 3 : 1.5}
                  opacity={0.9}
                />
                <text
                  x={b.x}
                  y={b.y - 12}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="10"
                  fontWeight="bold"
                  style={{
                    pointerEvents: "none",
                    textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                  }}
                >
                  {b.city}
                </text>
              </g>
            );
          })}

          {/* Render Click Indicator (Pending Pin) */}
          {clickedPos && (
            <g>
              <circle
                cx={clickedPos.x}
                cy={clickedPos.y}
                r={12}
                fill="none"
                stroke="#00ffcc"
                strokeWidth={2.5}
                strokeDasharray="4 2"
              />
              <circle
                cx={clickedPos.x}
                cy={clickedPos.y}
                r={4}
                fill="#00ffcc"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Control Panel / Actions */}
      <div
        style={{
          marginTop: "16px",
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        {/* Selected Pin Editor */}
        {selectedIndex !== null && branches[selectedIndex] && (
          <div
            style={{
              padding: "12px 16px",
              background: "#2a2a2a",
              borderRadius: "6px",
              flex: "1 1 300px",
              border: "1px solid #fc3d04",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                color: "#fc3d04",
                marginBottom: "8px",
              }}
            >
              Selected Pin: {branches[selectedIndex].city}
            </div>
            <div
              style={{ fontSize: "12px", color: "#ccc", marginBottom: "10px" }}
            >
              Coordinates: X = <strong>{branches[selectedIndex].x}</strong>, Y ={" "}
              <strong>{branches[selectedIndex].y}</strong>
              <br />
              <span style={{ color: "#aaa", fontStyle: "italic" }}>
                (Tip: Click anywhere on map to move this pin)
              </span>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <input
                type="text"
                value={branches[selectedIndex].city}
                onChange={(e) =>
                  handleUpdateBranchCity(selectedIndex, e.target.value)
                }
                style={{
                  padding: "6px 10px",
                  background: "#181818",
                  border: "1px solid #444",
                  color: "#fff",
                  borderRadius: "4px",
                  fontSize: "13px",
                  width: "100%",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginBottom: "10px",
                fontSize: "12px",
              }}
            >
              <label
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <input
                  type="checkbox"
                  checked={branches[selectedIndex].types?.includes("warehouse")}
                  onChange={() => handleToggleType(selectedIndex, "warehouse")}
                />
                Warehouse
              </label>
              <label
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <input
                  type="checkbox"
                  checked={branches[selectedIndex].types?.includes("service")}
                  onChange={() => handleToggleType(selectedIndex, "service")}
                />
                Service Point
              </label>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveBranch(selectedIndex)}
              style={{
                padding: "6px 12px",
                background: "#d32f2f",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              Delete Pin
            </button>
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              style={{
                padding: "6px 12px",
                background: "#555",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px",
                marginLeft: "8px",
              }}
            >
              Deselect
            </button>
          </div>
        )}

        {/* Add New Pin Form */}
        {clickedPos && (
          <div
            style={{
              padding: "12px 16px",
              background: "#2a2a2a",
              borderRadius: "6px",
              flex: "1 1 320px",
              border: "1px solid #00ffcc",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                color: "#00ffcc",
                marginBottom: "8px",
              }}
            >
              Add New Pin at X: {clickedPos.x}, Y: {clickedPos.y}
            </div>
            <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
              <input
                type="text"
                placeholder="City / Location Name"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                style={{
                  flex: 1,
                  padding: "6px 10px",
                  background: "#181818",
                  border: "1px solid #444",
                  color: "#fff",
                  borderRadius: "4px",
                  fontSize: "13px",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
                marginBottom: "12px",
                fontSize: "13px",
              }}
            >
              <label
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <input
                  type="checkbox"
                  checked={isWarehouse}
                  onChange={(e) => setIsWarehouse(e.target.checked)}
                />
                Warehouse
              </label>
              <label
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <input
                  type="checkbox"
                  checked={isService}
                  onChange={(e) => setIsService(e.target.checked)}
                />
                Service Point
              </label>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                type="button"
                onClick={handleAddPin}
                disabled={!newCity.trim()}
                style={{
                  padding: "6px 14px",
                  background: newCity.trim() ? "#fc3d04" : "#555",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: newCity.trim() ? "pointer" : "not-allowed",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                Add Pin
              </button>
              <button
                type="button"
                onClick={() => setClickedPos(null)}
                style={{
                  padding: "6px 12px",
                  background: "#444",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Raw JSON viewer if toggled */}
      {showJson && (
        <div style={{ marginTop: "16px" }}>
          <pre
            style={{
              padding: "12px",
              background: "#111",
              borderRadius: "4px",
              fontSize: "11px",
              overflowX: "auto",
              color: "#00ffcc",
            }}
          >
            {JSON.stringify(branches, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default MapPicker;
