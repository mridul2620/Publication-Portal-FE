import * as React from "react";
import { useEffect } from "react";
import { Connector } from './circuitPage';

interface SvgDoorCircuitProps extends React.SVGProps<SVGSVGElement> {
    connectors: Connector[];
    onConnectorClick: (connector: Connector) => void;
    highlightedText: string | null;
  }
  
  const SvgDoorCircuit2 = React.forwardRef<SVGSVGElement, SvgDoorCircuitProps>(
    ({ connectors, onConnectorClick, highlightedText, ...props }, ref) => {
      // Find the connector with the name C060
      const connectorC060 = connectors.find((conn) => conn.connectorName === 'C060');
      const connectorC010 = connectors.find((conn) => conn.connectorName === 'C010');
      const connectorC061 = connectors.find((conn) => conn.connectorName === 'C061');
      const connectorC095 = connectors.find((conn) => conn.connectorName === 'C095-1');
      const connectorC054 = connectors.find((conn) => conn.connectorName === 'C054-1');
      const connectorC028 = connectors.find((conn) => conn.connectorName === 'C028-1');
      const connectorC252 = connectors.find((conn) => conn.connectorName === 'C252-1');
      const connectorC059 = connectors.find((conn) => conn.connectorName === 'C059-1');
      const connectorC262 = connectors.find((conn) => conn.connectorName === 'C262');
      const connectorC253 = connectors.find((conn) => conn.connectorName === 'C253-1');
      const connectorX11A = connectors.find((conn) => conn.connectorName === 'X11-A');
      const connectorX11B = connectors.find((conn) => conn.connectorName === 'X11-B');

      return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      id="door_circuit_svg__Layer_1"
      x={0}
      y={0}
      viewBox="0 0 1190.6 842"
      {...props}
    >
      <style>
        {
          '.door_circuit_svg__st1{font-family:"Arial"}.door_circuit_svg__st2{font-size:5.8px;font-weight:700}.door_circuit_svg__st3{display:none}.door_circuit_svg__st4{display:inline;fill:#fff;stroke:#000}.door_circuit_svg__st4,.door_circuit_svg__st5,.door_circuit_svg__st6,.door_circuit_svg__st7,.door_circuit_svg__st8{stroke-width:.5669;stroke-miterlimit:11.3386}.door_circuit_svg__st5{display:none;fill:none;stroke:red;stroke-opacity:0}.door_circuit_svg__st6,.door_circuit_svg__st7,.door_circuit_svg__st8{stroke:#000}.door_circuit_svg__st6{fill:#fff;fill-opacity:.5}.door_circuit_svg__st7,.door_circuit_svg__st8{fill:none}.door_circuit_svg__st8{fill:#fff}.door_circuit_svg__st10,.door_circuit_svg__st11,.door_circuit_svg__st15,.door_circuit_svg__st16,.door_circuit_svg__st17,.door_circuit_svg__st9{fill:none;stroke:#fff;stroke-width:1.9843;stroke-miterlimit:11.3386}.door_circuit_svg__st10,.door_circuit_svg__st11,.door_circuit_svg__st15,.door_circuit_svg__st16,.door_circuit_svg__st17{stroke:#000;stroke-width:1.7008}.door_circuit_svg__st11,.door_circuit_svg__st15,.door_circuit_svg__st16,.door_circuit_svg__st17{stroke:#d1d0c6}.door_circuit_svg__st15,.door_circuit_svg__st16,.door_circuit_svg__st17{stroke:#000;stroke-width:1.9843}.door_circuit_svg__st16,.door_circuit_svg__st17{stroke:#5cff98;stroke-width:1.7008}.door_circuit_svg__st17{stroke:#00f}.door_circuit_svg__st19{fill:brown}.door_circuit_svg__st20{fill:#f51767}.door_circuit_svg__st21{fill:#fff}.door_circuit_svg__st22{fill:red}.door_circuit_svg__st23{font-size:4.5354px}.door_circuit_svg__st25{font-size:8.5039px}.door_circuit_svg__st26{font-size:11.3386px}.door_circuit_svg__st29,.door_circuit_svg__st30,.door_circuit_svg__st31{stroke:red;stroke-width:.5669;stroke-miterlimit:11.3386}.door_circuit_svg__st30,.door_circuit_svg__st31{fill:none}.door_circuit_svg__st31{fill:red}.door_circuit_svg__st32,.door_circuit_svg__st33{fill:none;stroke:#fff;stroke-width:1.9849;stroke-miterlimit:11.342}.door_circuit_svg__st33{stroke:#c1d5d9;stroke-width:1.7013}.door_circuit_svg__st34,.door_circuit_svg__st35,.door_circuit_svg__st36,.door_circuit_svg__st37,.door_circuit_svg__st38,.door_circuit_svg__st40{fill:none;stroke:#daed2d;stroke-width:.4253;stroke-miterlimit:11.342}.door_circuit_svg__st35,.door_circuit_svg__st36,.door_circuit_svg__st37,.door_circuit_svg__st38,.door_circuit_svg__st40{stroke:#000;stroke-width:1.7013}.door_circuit_svg__st36,.door_circuit_svg__st37,.door_circuit_svg__st38,.door_circuit_svg__st40{stroke:#664f0e}.door_circuit_svg__st37,.door_circuit_svg__st38,.door_circuit_svg__st40{stroke:#00fa00;stroke-width:.4253}.door_circuit_svg__st38,.door_circuit_svg__st40{stroke:#2534fa;stroke-width:1.7013}.door_circuit_svg__st40{stroke:#00fa00}.door_circuit_svg__st41,.door_circuit_svg__st42,.door_circuit_svg__st43,.door_circuit_svg__st44,.door_circuit_svg__st45,.door_circuit_svg__st47,.door_circuit_svg__st48{fill:none;stroke:#664f0e;stroke-width:.4253;stroke-miterlimit:11.342}.door_circuit_svg__st42,.door_circuit_svg__st43,.door_circuit_svg__st44,.door_circuit_svg__st45,.door_circuit_svg__st47,.door_circuit_svg__st48{stroke:#8214ff}.door_circuit_svg__st43,.door_circuit_svg__st44,.door_circuit_svg__st45,.door_circuit_svg__st47,.door_circuit_svg__st48{stroke-width:1.7013}.door_circuit_svg__st44,.door_circuit_svg__st45,.door_circuit_svg__st47,.door_circuit_svg__st48{stroke:#f80;stroke-width:.4253}.door_circuit_svg__st45,.door_circuit_svg__st47,.door_circuit_svg__st48{stroke:#ededed;stroke-width:1.7013}.door_circuit_svg__st47,.door_circuit_svg__st48{stroke:#daed2d}.door_circuit_svg__st48{stroke:#ed1818;stroke-width:.4253}'
        }
      </style>
      <path
        d="M584.6 394.2h70.9v70.9h-70.9z"
        className="door_circuit_svg__st6"
      />
      <path
        d="M582.4 416.4h2.2M582.4 442.9h2.2M582.4 456.2h2.2M582.4 403.1h2.2M657.7 411.9h-2.2M657.7 425.2h-2.2"
        className="door_circuit_svg__st7"
      />
      <g id="door_circuit_svg___x32_68b69f03d6d11ef863102cae894abaf_x5F_custpins">
        <circle
          cx={582.4}
          cy={416.4}
          r={1.4}
          className="door_circuit_svg__st8"
        />
        <circle
          cx={582.4}
          cy={442.9}
          r={1.4}
          className="door_circuit_svg__st8"
        />
        <circle
          cx={582.4}
          cy={456.2}
          r={1.4}
          className="door_circuit_svg__st8"
        />
        <circle
          cx={582.4}
          cy={403.1}
          r={1.4}
          className="door_circuit_svg__st8"
        />
        <circle
          cx={657.7}
          cy={411.9}
          r={1.4}
          className="door_circuit_svg__st8"
        />
        <circle
          cx={657.7}
          cy={425.2}
          r={1.4}
          className="door_circuit_svg__st8"
        />
      </g>
      <path d="M584.6 673.2h70.9v31h-70.9z" className="door_circuit_svg__st6" />
      <path
        d="M582.4 695.4h2.2M582.4 682.1h2.2"
        className="door_circuit_svg__st7"
      />
      <g id="door_circuit_svg___x34_653c6733e4111ef863102cae894abaf_x5F_custpins">
        <circle
          cx={582.4}
          cy={695.4}
          r={1.4}
          className="door_circuit_svg__st8"
        />
        <circle
          cx={582.4}
          cy={682.1}
          r={1.4}
          className="door_circuit_svg__st8"
        />
      </g>
      <path d="M584.6 48.7h70.9v31h-70.9z" className="door_circuit_svg__st6" />
      <path
        d="M582.4 57.6h2.2M582.4 70.9h2.2"
        className="door_circuit_svg__st7"
      />
      <g id="door_circuit_svg___x34_aa9b4d83c9b11ef863102cae894abaf_x5F_custpins">
        <circle
          cx={582.4}
          cy={57.6}
          r={1.4}
          className="door_circuit_svg__st8"
        />
        <circle
          cx={582.4}
          cy={70.9}
          r={1.4}
          className="door_circuit_svg__st8"
        />
      </g>
      <path
        d="M292.3 491.6h70.9v88.6h-70.9z"
        className="door_circuit_svg__st6"
      />
      <path
        d="M290.1 527h2.2M290.1 540.3h2.2M290.1 500.5h2.2M290.1 513.8h2.2M365.4 571.4h-2.2M365.4 504.9h-2.2M365.4 558.1h-2.2M365.4 544.8h-2.2"
        className="door_circuit_svg__st7"
      />
      <g id="door_circuit_svg___x36_11c0dff3e2d11ef863102cae894abaf_x5F_custpins">
        <circle cx={290.1} cy={527} r={1.4} className="door_circuit_svg__st8" />
        <circle
          cx={290.1}
          cy={540.3}
          r={1.4}
          className="door_circuit_svg__st8"
        />
        <circle
          cx={290.1}
          cy={500.5}
          r={1.4}
          className="door_circuit_svg__st8"
        />
        <circle
          cx={290.1}
          cy={513.8}
          r={1.4}
          className="door_circuit_svg__st8"
        />
        <circle
          cx={365.4}
          cy={571.4}
          r={1.4}
          className="door_circuit_svg__st8"
        />
        <circle
          cx={365.4}
          cy={504.9}
          r={1.4}
          className="door_circuit_svg__st8"
        />
        <circle
          cx={365.4}
          cy={558.1}
          r={1.4}
          className="door_circuit_svg__st8"
        />
        <circle
          cx={365.4}
          cy={544.8}
          r={1.4}
          className="door_circuit_svg__st8"
        />
      </g>
      <path
        d="M584.6 535.9h70.9v75.3h-70.9z"
        className="door_circuit_svg__st6"
      />
      <path
        d="M582.4 571.4h2.2M582.4 602.4h2.2M582.4 544.8h2.2M582.4 589.1h2.2M582.4 558.1h2.2"
        className="door_circuit_svg__st7"
      />
      <g id="door_circuit_svg___x36_82ecf783e2d11ef863102cae894abaf_x5F_custpins">
        <circle
          cx={582.4}
          cy={571.4}
          r={1.4}
          className="door_circuit_svg__st8"
        />
        <circle
          cx={582.4}
          cy={602.4}
          r={1.4}
          className="door_circuit_svg__st8"
        />
        <circle
          cx={582.4}
          cy={544.8}
          r={1.4}
          className="door_circuit_svg__st8"
        />
        <circle
          cx={582.4}
          cy={589.1}
          r={1.4}
          className="door_circuit_svg__st8"
        />
        <circle
          cx={582.4}
          cy={558.1}
          r={1.4}
          className="door_circuit_svg__st8"
        />
      </g>
      <path d="M584.6 287.9h70.9v31h-70.9z" className="door_circuit_svg__st6" />
      <path
        d="M582.4 310.1h2.2M582.4 296.8h2.2"
        className="door_circuit_svg__st7"
      />
      <g id="door_circuit_svg___x36_f515fb13d6511ef863102cae894abaf_x5F_custpins">
        <circle
          cx={582.4}
          cy={310.1}
          r={1.4}
          className="door_circuit_svg__st8"
        />
        <circle
          cx={582.4}
          cy={296.8}
          r={1.4}
          className="door_circuit_svg__st8"
        />
      </g>
      <path d="M584.6 341h70.9v31h-70.9z" className="door_circuit_svg__st6" />
      <path
        d="M657.7 349.9h-2.2M657.7 363.2h-2.2"
        className="door_circuit_svg__st7"
      />
      <g id="door_circuit_svg___x37_cae58603d6911ef863102cae894abaf_x5F_custpins">
        <circle
          cx={657.7}
          cy={349.9}
          r={1.4}
          className="door_circuit_svg__st8"
        />
        <circle
          cx={657.7}
          cy={363.2}
          r={1.4}
          className="door_circuit_svg__st8"
        />
      </g>
      <path
        d="M584.6 97.5h70.9v44.3h-70.9z"
        className="door_circuit_svg__st6"
      />
      <path
        d="M582.4 119.6h2.2M582.4 132.9h2.2M582.4 106.3h2.2M657.7 124h-2.2M657.7 110.7h-2.2"
        className="door_circuit_svg__st7"
      />
      <g id="door_circuit_svg__c70ec0b63e4411ef863102cae894abaf_custpins">
        <circle
          cx={582.4}
          cy={119.6}
          r={1.4}
          className="door_circuit_svg__st8"
        />
        <circle
          cx={582.4}
          cy={132.9}
          r={1.4}
          className="door_circuit_svg__st8"
        />
        <circle
          cx={582.4}
          cy={106.3}
          r={1.4}
          className="door_circuit_svg__st8"
        />
        <circle cx={657.7} cy={124} r={1.4} className="door_circuit_svg__st8" />
        <circle
          cx={657.7}
          cy={110.7}
          r={1.4}
          className="door_circuit_svg__st8"
        />
      </g>
      <path
        d="M584.6 628.9h70.9v17.7h-70.9z"
        className="door_circuit_svg__st6"
      />
      <path
        d="M582.4 637.8h2.2M657.7 637.8h-2.2"
        className="door_circuit_svg__st7"
      />
      <g id="door_circuit_svg__dae2cd5f3e4211ef863102cae894abaf_custpins">
        <circle
          cx={582.4}
          cy={637.8}
          r={1.4}
          className="door_circuit_svg__st8"
        />
        <circle
          cx={657.7}
          cy={637.8}
          r={1.4}
          className="door_circuit_svg__st8"
        />
      </g>
      <path
        d="M584.6 194.9h70.9v70.9h-70.9z"
        className="door_circuit_svg__st6"
      />
      <path
        d="M582.4 230.3h2.2M582.4 243.6h2.2M582.4 256.9h2.2M582.4 203.8h2.2M582.4 217h2.2M657.7 212.6h-2.2"
        className="door_circuit_svg__st7"
      />
      <g id="door_circuit_svg__fac03a9c3ca011ef863102cae894abaf_custpins">
        <circle
          cx={582.4}
          cy={230.3}
          r={1.4}
          className="door_circuit_svg__st8"
        />
        <circle
          cx={582.4}
          cy={243.6}
          r={1.4}
          className="door_circuit_svg__st8"
        />
        <circle
          cx={582.4}
          cy={256.9}
          r={1.4}
          className="door_circuit_svg__st8"
        />
        <circle
          cx={582.4}
          cy={203.8}
          r={1.4}
          className="door_circuit_svg__st8"
        />
        <circle cx={582.4} cy={217} r={1.4} className="door_circuit_svg__st8" />
        <circle
          cx={657.7}
          cy={212.6}
          r={1.4}
          className="door_circuit_svg__st8"
        />
      </g>
      <path d="M925.7 110.7h196.8" className="door_circuit_svg__st9" />
      <path
        id="door_circuit_svg__GND-P-02_X11"
        d="M925.7 110.7h196.8"
        className="door_circuit_svg__st10"
      />
      <path d="M859.3 150.6H69" className="door_circuit_svg__st9" />
      <path
        id="door_circuit_svg__X11_SP_DR_DOORILLU"
        d="M859.3 150.6H69"
        className="door_circuit_svg__st11"
      />
      <path d="M69 106.3h513.5" className="door_circuit_svg__st9" />
      <path
        id="door_circuit_svg__X11_C010_3"
        d="M69 106.3h513.5"
        style={{
          fill: "none",
          stroke: "#99c",
          strokeWidth: 1.7008,
          strokeMiterlimit: 11.3386,
        }}
      />
      <path d="M69 119.6h513.5" className="door_circuit_svg__st9" />
      <path
        id="door_circuit_svg__X11_C010_2"
        d="M69 119.6h513.5"
        style={{
          fill: "none",
          stroke: "#bddb81",
          strokeWidth: 1.7008,
          strokeMiterlimit: 11.3386,
        }}
      />
      <path d="M69 132.9h513.5" className="door_circuit_svg__st9" />
      <path
        id="door_circuit_svg__X11_C010_1"
        d="M69 132.9h513.5"
        style={{
          fill: "none",
          stroke: "#6f52a2",
          strokeWidth: 1.7008,
          strokeMiterlimit: 11.3386,
        }}
      />
      <path
        d="m925.7 110.7-8.9 13.3v287.9h-259"
        className="door_circuit_svg__st15"
      />
      <path
        id="door_circuit_svg__GND-P-02_C054_1_1"
        d="m925.7 110.7-8.9 13.3v287.9h-259"
        className="door_circuit_svg__st10"
      />
      <path d="M925.7 110.7v314.5H657.8" className="door_circuit_svg__st15" />
      <path
        id="door_circuit_svg__GND-P-02_C054_1_2"
        d="M925.7 110.7v314.5H657.8"
        className="door_circuit_svg__st10"
      />
      <path
        d="M68.2 57.7h50.6l8.8 13.3h398.6l8.8-13.3h46.5"
        className="door_circuit_svg__st9"
      />
      <path
        id="door_circuit_svg__X11_C60_2"
        d="M68.2 57.7h50.6l8.8 13.3h398.6l8.8-13.3h46.5"
        className="door_circuit_svg__st16"
      />
      <path
        d="M68.2 70.9h50.6l8.8-13.3h398.6l8.8 13.3h46.5"
        className="door_circuit_svg__st9"
      />
      <path
        id="door_circuit_svg__X11_C60_1"
        d="M68.2 70.9h50.6l8.8-13.3h398.6l8.8 13.3h46.5"
        className="door_circuit_svg__st17"
      />
      <path
        d="M365.4 504.9h569.1V124l-8.8-13.3"
        className="door_circuit_svg__st15"
      />
      <path
        id="door_circuit_svg__GND-P-02_C262_6"
        d="M365.4 504.9h569.1V124l-8.8-13.3"
        className="door_circuit_svg__st10"
      />
      <path
        d="M657.7 212.6h192.7v-48.7l8.9-13.3"
        className="door_circuit_svg__st9"
      />
      <path
        id="door_circuit_svg__C061_SP_DR_DOORILLU"
        d="M657.7 212.6h192.7v-48.7l8.9-13.3"
        className="door_circuit_svg__st11"
      />
      <path d="M657.7 349.9h201.5V150.6" className="door_circuit_svg__st9" />
      <path
        id="door_circuit_svg__SP_DDR_ILLUM"
        d="M657.7 349.9h201.5V150.6"
        className="door_circuit_svg__st11"
      />
      <path
        d="M657.7 363.2H908V124l17.7-13.3"
        className="door_circuit_svg__st9"
      />
      <path
        id="door_circuit_svg__SP_DDR_GND"
        d="M657.7 363.2H908V124l17.7-13.3"
        className="door_circuit_svg__st10"
      />
      <path
        d="M67.3 500.2h221.2M69 513.8l221.2-.1M69 527.1h221.2M69 540.4h221.2M925.7 110.7l17.7 13.3v513.8H657.8"
        className="door_circuit_svg__st9"
      />
      <path
        id="door_circuit_svg__C252_1_SP_DDR_GND"
        d="m925.7 110.7 17.7 13.3v513.8H657.8"
        className="door_circuit_svg__st10"
      />
      <path d="M657.7 124h241.4v26.6h-39.8" className="door_circuit_svg__st9" />
      <path
        id="door_circuit_svg__C010_SP_DR_DOORILLU"
        d="M657.7 124h241.4v26.6h-39.8"
        style={{
          fill: "none",
          stroke: "#d1c6c6",
          strokeWidth: 1.7008,
          strokeMiterlimit: 11.3386,
        }}
      />
      <path d="M657.7 110.7h268" className="door_circuit_svg__st9" />
      <path
        id="door_circuit_svg__GND-P-02_C010"
        d="M657.7 110.7h268"
        className="door_circuit_svg__st10"
      />

      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(49.362 496.092)"
      >
        {"1"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(80.345 496.092)"
      >
        {"1"}
      </text>
      <text
        className="door_circuit_svg__st20 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(58.144 496.092)"
        style={{ cursor: 'pointer', color:"blue" }}
        onClick={() => connectorX11A && onConnectorClick(connectorX11A)}
      >
        {"X11_A"}
      </text>
      <path d="M310.47 394.93h96.7z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(305.888 400.621)"
        style={{
            textShadow: highlightedText === 'X11_C054_3,WH/BN,0.35,1800.0,FLRY-A'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"X11_C054_3,WH/BN,0.35,1800.0,FLRY-A"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(49.362 509.387)"
      >
        {"2"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(80.345 509.387)"
      >
        {"2"}
      </text>
      <text
        className="door_circuit_svg__st20 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(58.144 509.387)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorX11A && onConnectorClick(connectorX11A)}
      >
        {"X11_A"}
      </text>
      <path d="M310.47 408.22h96.7z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(306.83 413.916)"
        style={{
            textShadow: highlightedText === 'X11_C054_4,BN/YE,0.35,1800.0,FLRY-A'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"X11_C054_4,BN/YE,0.35,1800.0,FLRY-A"}
      </text>
      <path d="M977.5 102.6h91.3z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(974.157 108.283)"
        style={{
            textShadow: highlightedText === 'GND-P-02_X11,BK,0.5,1685.0,FLRY-B'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"GND-P-02_X11,BK,0.5,1685.0,FLRY-B"}
      </text>
      <path d="M310.4 142.5h96.7z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(303.058 148.139)"
        style={{
            textShadow: highlightedText === 'X11_SP_DR_DOORILLU,GY/BN,0.35,960.0'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"X11_SP_DR_DOORILLU,GY/BN,0.35,960.0"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(51.573 66.445)"
      >
        {"5"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(78.162 66.445)"
      >
        {"5"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(49.362 522.652)"
      >
        {"3"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(80.345 522.652)"
      >
        {"3"}
      </text>
      <text
        className="door_circuit_svg__st20 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(58.144 522.652)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorX11A && onConnectorClick(connectorX11A)}
      >
        {"X11_A"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(47.786 535.947)"
      >
        {"10"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(78.769 535.947)"
      >
        {"10"}
      </text>
      <text
        className="door_circuit_svg__st20 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(58.144 535.947)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorX11A && onConnectorClick(connectorX11A)}
      >
        {"X11_A"}
      </text>
      <path d="M432.19 582.43h121z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(406.64 542.353)"
        style={{
            textShadow: highlightedText === 'C028_C262_8,BU,0.35,1040.0,LHD && PMA,FLRY-A'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"C028_C262_8,BU,0.35,1040.0,LHD && PMA,FLRY-A"}
      </text>
      <text
        id="door_circuit_svg__C054-1"
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(554.636 411.902)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC054 && onConnectorClick(connectorC054)} 
      >
        {"C054_1 6"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st23"
        transform="translate(588.29 416.353)"
      >
        {"DRIVER LOCKED"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(554.636 438.492)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC054 && onConnectorClick(connectorC054)} 
      >
        {"C054_1 1"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st23"
        transform="translate(588.982 442.914)"
      >
        {"TBC"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(554.636 451.785)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC054 && onConnectorClick(connectorC054)} 
      >
        {"C054_1 2"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st23"
        transform="translate(588.982 456.209)"
      >
        {"TBC"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(554.636 398.637)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC054 && onConnectorClick(connectorC054)} 
      >
        {"C054_1 5"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st23"
        transform="translate(588.932 403.059)"
      >
        {"DRIVER DOOR AJAR"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(660.935 407.48)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC054 && onConnectorClick(connectorC054)} 
      >
        {"C054_1 3"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st23"
        transform="translate(636.796 411.932)"
      >
        {"CL31"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(660.935 420.746)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC054 && onConnectorClick(connectorC054)} 
      >
        {"C054_1 7"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st23"
        transform="translate(636.796 425.197)"
      >
        {"CL31"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(588.575 391.379)"
      >
        {"Door Lock Driver (XXXX)"}
      </text>
      <path d="M412.09 549.91h123.7z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(405.22 555.62)"
        style={{
            textShadow: highlightedText === 'C028_C262_10,YE,0.35,1040.0,LHD && PMA,FLRY-A'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"C028_C262_10,YE,0.35,1040.0,LHD && PMA,FLRY-A"}
      </text>
      <path d="M279.4 98.2h96.7z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(275.507 103.861)"
        style={{
            textShadow: highlightedText === 'X11_C010_3,WH/VT,0.35,2320.0,FLRY-A'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"X11_C010_3,WH/VT,0.35,2320.0,FLRY-A"}
      </text>
      <path d="M413.39 563.2h121z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(406.326 568.914)"
        style={{
            textShadow: highlightedText === 'C028_C262_2,GN,0.35,1040.0,LHD && PMA,FLRY-A'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"C028_C262_2,GN,0.35,1040.0,LHD && PMA,FLRY-A"}
      </text>
      <path d="M279.4 111.5h96.7z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(276.447 117.156)"
        style={{
            textShadow: highlightedText === 'X11_C010_2,YE/VT,0.35,2320.0,FLRY-A'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"X11_C010_2,YE/VT,0.35,2320.0,FLRY-A"}
      </text>
      <path d="M279.4 124.8h96.7z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(275.192 130.422)"
        style={{
            textShadow: highlightedText === 'X11_C010_1,VT/WH,0.35,2320.0,FLRY-A'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"X11_C010_1,VT/WH,0.35,2320.0,FLRY-A"}
      </text>
      <path d="M275.3 62.8h104.8z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(270.753 68.428)"
        style={{
            textShadow: highlightedText === 'X11_C60_2,GN/RD,1.0,1555.0,TP_2,FLRY-B'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"X11_C60_2,GN/RD,1.0,1555.0,TP_2,FLRY-B"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st23"
        transform="translate(592.52 217.049)"
      >
        {"CL31"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(51.573 53.15)"
      >
        {"4"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(78.162 53.15)"
      >
        {"4"}
      </text>
      <text
        className="door_circuit_svg__st20 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(58.144 53.15)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorX11A && onConnectorClick(connectorX11A)}
      >
        {"X11_A"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(659.666 208.176)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC061 && onConnectorClick(connectorC061)} 
      >
        {"C061 5"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(560 212.6)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC061 && onConnectorClick(connectorC061)} 
      >
        {"C061 6"}
      </text>
      <path d="M416.09 580.95h115.6z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(410.16 586.63)"
        style={{
            textShadow: highlightedText === 'X11_C028_1,BN,0.5,2390.0,LHD && PMA,FLRY-B'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"X11_C028_1,BN,0.5,2390.0,LHD && PMA,FLRY-B"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(554.636 690.973)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC059 && onConnectorClick(connectorC059)} 
      >
        {"C059_1 1"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st23"
        transform="translate(593.405 695.367)"
      >
        {"TBC"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(554.636 677.65)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC059 && onConnectorClick(connectorC059)}
      >
        {"C059_1 2"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st23"
        transform="translate(593.405 682.102)"
      >
        {"TBC"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(586.376 671.018)"
      >
        {"Motor-Lifter-Driver (MXXX)"}
      </text>
      <path d="M704.99 403.75h104.8z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(700.188 409.465)"
        style={{
            textShadow: highlightedText === 'GND-P-02_C054_1_1,BK,0.5,1845.0,FLRY-B'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"GND-P-02_C054_1_1,BK,0.5,1845.0,FLRY-B"}
      </text>
      <text
  className="door_circuit_svg__st1 door_circuit_svg__st2"
  transform="translate(560 53.15)"
  style={{ cursor: 'pointer', fill: 'blue' }}
  onClick={() => connectorC060 && onConnectorClick(connectorC060)} // Only call onConnectorClick if connectorC060 exists
>
  {"C060 2"}
</text>
<text
  className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(560 66.445)"
  style={{ cursor: 'pointer', fill: 'blue' }}
  onClick={() => connectorC060 && onConnectorClick(connectorC060)} // Only call onConnectorClick if connectorC060 exists
>
  {"C060 1"}
</text>

      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(590.94 45.893)"
      >
        {"Speaker-Driver (FXXX)"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st23"
        transform="translate(593.704 57.572)"
      >
        {"Speaker_FL-"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st23"
        transform="translate(636.796 212.6)"
      >
        {"CL58"}
      </text>
      <text
        className="door_circuit_svg__st20 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(58.144 66.445)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorX11A && onConnectorClick(connectorX11A)}
      >
        {"X11_A"}
      </text>
      <path d="M704.99 417.04h104.8z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(700.188 422.76)"
        style={{
            textShadow: highlightedText === 'GND-P-02_C054_1_2,BK,0.5,1845.0,FLRY-B'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"GND-P-02_C054_1_2,BK,0.5,1845.0,FLRY-B"}
      </text>
      <path d="M409.39 594.24h129.1z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(401.919 599.924)"
        style={{
            textShadow: highlightedText === 'GND-P-02_C028_1,BK,0.5,2390.0,LHD && PMA,FLRY-B'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"GND-P-02_C028_1,BK,0.5,2390.0,LHD && PMA,FLRY-B"}
      </text>
      <path d="M269.9 49.5h115.6z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(265.235 55.135)"
        style={{
            textShadow: highlightedText === 'X11_C60_1,BU/RD,1.0,1555.0,TP_2,ALL,FLRY-B'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"X11_C60_1,BU/RD,1.0,1555.0,TP_2,ALL,FLRY-B"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st23"
        transform="translate(593.135 70.867)"
      >
        {"Speaker_FL+"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(269.93 522.623)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC262 && onConnectorClick(connectorC262)}
      >
        {"C262 1"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st23"
        transform="translate(297.703 527.047)"
      >
        {"Horz Adj RS"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(269.93 535.918)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC262 && onConnectorClick(connectorC262)}
      >
        {"C262 7"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st23"
        transform="translate(295.919 540.34)"
      >
        {"PWR"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(367.357 566.93)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC262 && onConnectorClick(connectorC262)}
      >
        {"C262 2"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st23"
        transform="translate(333.513 571.352)"
      >
        {"Horz Adj LS"}
      </text>
      <text
        className="door_circuit_svg__st1"
        transform="matrix(.8288 0 0 1 269.93 497.067)"
        style={{ cursor: 'pointer', fontSize:6.2, fontFamily:'Aerial', fontWeight:"bold", fill:"blue"}}
        onClick={() => connectorC262 && onConnectorClick(connectorC262)}
      >
        {"C262 9"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st23"
        transform="translate(298.457 500.484)"
      >
        {"Vert Adj RS"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(367.357 500.484)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC262 && onConnectorClick(connectorC262)}
      >
        {"C262 6"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st23"
        transform="translate(344.87 504.908)"
      >
        {"GND"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(269.93 509.3)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC262 && onConnectorClick(connectorC262)}
      >
        {"C262 3"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st23"
        transform="translate(298.419 513.752)"
      >
        {"Comm Term RS"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(292.33 488.777)"
      >
        {"Switch-Mirror Adjust (SXXX)"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(47.786 292.338)"
      >
        {"15"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(78.769 292.338)"
      >
        {"15"}
      </text>
      <text
        className="door_circuit_svg__st20 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(58.144 292.338)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorX11A && onConnectorClick(connectorX11A)}
      >
        {"X11_A"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(47.786 305.63)"
      >
        {"16"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(78.769 305.63)"
      >
        {"16"}
      </text>
      <text
        className="door_circuit_svg__st20 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(58.144 305.63)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorX11A && onConnectorClick(connectorX11A)}
      >
        {"X11_A"}
      </text>
      <text
        id="door_circuit_svg__C028-1"
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(554.636 566.93)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC028 && onConnectorClick(connectorC028)} 
      >
        {"C028_1 5"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(554.636 597.941)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC028 && onConnectorClick(connectorC028)} 
      >
        {"C028_1 2"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st23"
        transform="translate(592.52 602.363)"
      >
        {"CL31"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(554.636 540.37)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC028 && onConnectorClick(connectorC028)} 
      >
        {"C028_1 3"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(554.636 584.646)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC028 && onConnectorClick(connectorC028)} 
      >
        {"C028_1 1"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st23"
        transform="translate(593.405 589.096)"
      >
        {"TBC"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(554.636 553.635)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC028 && onConnectorClick(connectorC028)} 
      >
        {"C028_1 4"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(583.229 533.111)"
      >
        {"Mirror-Exterior-Driver (XXXX)"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st23"
        transform="translate(334.267 544.762)"
      >
        {"Vert Adj LS"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(47.786 438.492)"
      >
        {"10"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(78.769 438.492)"
      >
        {"10"}
      </text>
      <text
        className="door_circuit_svg__st20 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(58.144 438.492)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorX11B && onConnectorClick(connectorX11B)}
      >
        {"X11_B"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st23"
        transform="translate(325.356 558.057)"
      >
        {"Comm Term LS"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(554.636 305.603)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC095 && onConnectorClick(connectorC095)} 
      >
        {"C095_1 2"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st23"
        transform="translate(593.358 310.055)"
      >
        {"Door_pressure_sensor_D-"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(554.636 292.338)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC095 && onConnectorClick(connectorC095)} 
      >
        {"C095_1 1"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st23"
        transform="translate(592.79 296.76)"
      >
        {"Door_pressure_sensor_D+"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(597.867 281.254)"
      >
        {"Sensor-Pressure-"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(595.354 286.924)"
      >
        {"Door-Driver (TXXX)"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st23"
        transform="translate(593.218 230.315)"
      >
        {"Window_FL_up_down"}
      </text>
      <path d="M284.82 208.9h85.9z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(282.092 214.582)"
        style={{
            textShadow: highlightedText === 'X11_C61_6,BK,0.35,1625.0,FLRY-A'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"X11_C61_6,BK,0.35,1625.0,FLRY-A"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(660.935 345.486)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC253 && onConnectorClick(connectorC253)}
      >
        {"C253_1 2"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(660.935 358.781)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC253 && onConnectorClick(connectorC253)}
      >
        {"C253_1 1"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(606.213 334.404)"
      >
        {"Door Open"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(592.508 340.072)"
      >
        {"Ambient Light (XXXX)"}
      </text>
      <path d="M311.77 222.19h94z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(307.935 227.877)"
        style={{
            textShadow: highlightedText === 'X11_C61_1,BN/GN,0.35,1625.0,FLRY-A'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"X11_C61_1,BN/GN,0.35,1625.0,FLRY-A"}
      </text>
      <path d="M409.39 496.76h129.1z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(401.919 502.469)"
        style={{
            textShadow: highlightedText === 'GND-P-02_C262_6,BK,0.35,335.0,LHD && PMA,FLRY-A'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"GND-P-02_C262_6,BK,0.35,335.0,LHD && PMA,FLRY-A"}
      </text>
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(833.746 146.184)"
        style={{
            textShadow: highlightedText === 'SP_DR_DOORILLU'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"SP_DR_DOORILLU"}
      </text>
      <path d="M707.69 204.54h99.4z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(699.722 210.16)"
        style={{
            textShadow: highlightedText === 'C061_SP_DR_DOORILLU,GY/BN,0.35,685.0'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"C061_SP_DR_DOORILLU,GY/BN,0.35,685.0"}
      </text>
      <path d="M280.72 235.48h94z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(276.425 241.172)"
        style={{
            textShadow: highlightedText === 'X11_C61_2,BU/WH,0.35,1625.0,FLRY-A'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"X11_C61_2,BU/WH,0.35,1625.0,FLRY-A"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st23"
        transform="translate(592.84 243.61)"
      >
        {"Window_FR_up_down"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st23"
        transform="translate(592.965 256.904)"
      >
        {"Window_RL_up_down"}
      </text>
      <path d="M311.77 248.77h94z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(307.935 254.467)"
        style={{
            textShadow: highlightedText === 'X11_C61_3,GN/BN,0.35,1625.0,FLRY-A'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"X11_C61_3,GN/BN,0.35,1625.0,FLRY-A"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(47.786 101.877)"
      >
        {"12"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(78.769 101.877)"
      >
        {"12"}
      </text>
      <text
        className="door_circuit_svg__st20 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(58.144 101.877)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorX11B && onConnectorClick(connectorX11B)}
      >
        {"X11_B"}
      </text>
      <text
        className="door_circuit_svg__st20 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(58.144 398.637)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorX11A && onConnectorClick(connectorX11A)}
      >
        {"X11_A"}
      </text>
      <text
        className="door_circuit_svg__st20 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(58.144 411.932)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorX11A && onConnectorClick(connectorX11A)}
      >
        {"X11_A"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(47.786 115.172)"
      >
        {"13"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(78.769 115.172)"
      >
        {"13"}
      </text>
      <text
        className="door_circuit_svg__st20 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(58.144 115.172)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorX11B && onConnectorClick(connectorX11B)}
      >
        {"X11_B"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(49.362 128.467)"
      >
        {"6"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(80.345 128.467)"
      >
        {"6"}
      </text>
      <text
        className="door_circuit_svg__st20 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(58.144 128.467)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorX11B && onConnectorClick(connectorX11B)}
      >
        {"X11_B"}
      </text>
      <path d="M706.3 341.8h102.1z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(700.037 347.47)"
        style={{
            textShadow: highlightedText === 'SP_DDR_ILLUM,GY/BN,0.35,1360.0,FLRY-A'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"SP_DDR_ILLUM,GY/BN,0.35,1360.0,FLRY-A"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(49.362 451.785)"
      >
        {"9"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(80.345 451.785)"
      >
        {"9"}
      </text>
      <text
        className="door_circuit_svg__st20 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(58.144 451.785)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorX11B && onConnectorClick(connectorX11B)}
      >
        {"X11_B"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(51.573 677.68)"
      >
        {"1"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(82.556 677.68)"
      >
        {"1"}
      </text>
      <text
        className="door_circuit_svg__st20 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(60.355 677.68)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorX11B && onConnectorClick(connectorX11B)}
      >
        {"X11_B"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(51.573 690.973)"
      >
        {"8"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(82.556 690.973)"
      >
        {"8"}
      </text>
      <text
        className="door_circuit_svg__st20 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(60.355 690.973)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorX11B && onConnectorClick(connectorX11B)}
      >
        {"X11_B"}
      </text>
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(898.274 106.299)"
        style={{
            textShadow: highlightedText === 'SP_DR_DOOR_GND'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"SP_DR_DOOR_GND"}
      </text>
      <path d="M714.4 355.1h85.9z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(708.703 360.736)"
        style={{
            textShadow: highlightedText === 'SP_DDR_GND,BK,0.35,635.0,FLRY-A'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"SP_DDR_GND,BK,0.35,635.0,FLRY-A"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st23"
        transform="translate(592.589 203.754)"
      >
        {"Window_RR_up_down"}
      </text>
      <path d="M118 492.4h118.3z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(111.825 498.047)"
        style={{
            textShadow: highlightedText === 'X11_C262_9,BU,0.35,1580.0,LHD && PMA,FLRY-A'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"X11_C262_9,BU,0.35,1580.0,LHD && PMA,FLRY-A"}
      </text>
      <path d="M118 505.69h118.3z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(111.981 511.342)"
        style={{
            textShadow: highlightedText === 'X11_C262_3,YE,0.35,1580.0,LHD && PMA,FLRY-A'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"X11_C262_3,YE,0.35,1580.0,LHD && PMA,FLRY-A"}
      </text>
      <path d="M118 518.98h118.3z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(111.51 524.637)"
        style={{
            textShadow: highlightedText === 'X11_C262_1,GN,0.35,1580.0,LHD && PMA,FLRY-A'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"X11_C262_1,GN,0.35,1580.0,LHD && PMA,FLRY-A"}
      </text>
      <path d="M114 532.27h126.4z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(107.1 537.932)"
        style={{
            textShadow: highlightedText === 'X11_C262_7,YE/RD,0.35,1580.0,LHD && PMA,FLRY-A'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"X11_C262_7,YE/RD,0.35,1580.0,LHD && PMA,FLRY-A"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(49.362 597.941)"
      >
        {"2"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(80.345 597.941)"
      >
        {"2"}
      </text>
      <text
        className="door_circuit_svg__st20 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(58.144 597.941)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorX11B && onConnectorClick(connectorX11B)}
      >
        {"X11_B"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(49.362 584.674)"
      >
        {"3"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(80.345 584.674)"
      >
        {"3"}
      </text>
      <text
        className="door_circuit_svg__st20 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(58.144 584.674)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorX11B && onConnectorClick(connectorX11B)}
      >
        {"X11_B"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(49.362 199.332)"
      >
        {"8"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(80.345 199.332)"
      >
        {"8"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(49.362 212.627)"
      >
        {"9"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(80.345 212.627)"
      >
        {"9"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(47.786 225.893)"
      >
        {"12"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(78.769 225.893)"
      >
        {"12"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(47.786 239.188)"
      >
        {"13"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(78.769 239.188)"
      >
        {"13"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(47.786 252.482)"
      >
        {"14"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(78.769 252.482)"
      >
        {"14"}
      </text>
      <path d="M279.42 434.79h96.7z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(276.263 440.477)"
        style={{
            textShadow: highlightedText === 'X11_C054_2L,BN/VT,0.5,1820.0,FLRY-B'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"X11_C054_2L,BN/VT,0.5,1820.0,FLRY-B"}
      </text>
      <text
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC010 && onConnectorClick(connectorC010)} 
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(560 115.172)"
      >
        {"C010 2"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st23"
        transform="translate(588.44 119.594)"
      >
        {"CENTRAL LOCK BUTTON"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(560 128.438)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC010 && onConnectorClick(connectorC010)} 
      >
        {"C010 4"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st23"
        transform="translate(588.492 132.889)"
      >
        {"CENTRAL LOCK STATUS LED"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(560 101.877)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC010 && onConnectorClick(connectorC010)} 
      >
        {"C010 1"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st23"
        transform="translate(589.587 106.299)"
      >
        {"CENTRAL UNLOCK BUTTON"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(661.877 119.566)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC010 && onConnectorClick(connectorC010)} 
      >
        {"C010 3"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st23"
        transform="translate(636.796 124.016)"
      >
        {"CL58"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(661.877 106.299)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC010 && onConnectorClick(connectorC010)} 
      >
        {"C010 5"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st23"
        transform="translate(636.796 110.72)"
      >
        {"CL31"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(585.418 94.621)"
      >
        {"Lock/Unlock Button (XXXX)"}
      </text>
      <path
        d="m273.98 447.875 107.498.538z"
        className="door_circuit_svg__st21"
      />
      <text className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2">
        {"X11_C054_1L,VT/GY,0.5,1820.0,ALL,FLRY-B"}
      </text>
      <text
        className="door_circuit_svg__st20 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(58.144 199.332)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorX11A && onConnectorClick(connectorX11A)}
      >
        {"X11_A"}
      </text>
      <text
        className="door_circuit_svg__st20 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(58.144 212.627)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorX11A && onConnectorClick(connectorX11A)}
      >
        {"X11_A"}
      </text>
      <text
        className="door_circuit_svg__st20 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(58.144 225.893)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorX11A && onConnectorClick(connectorX11A)}
      >
        {"X11_A"}
      </text>
      <text
        className="door_circuit_svg__st20 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(58.144 239.188)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorX11A && onConnectorClick(connectorX11A)}
      >
        {"X11_A"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(660.935 633.373)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC252 && onConnectorClick(connectorC252)} 
      >
        {"C252_1 2"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(554.636 633.373)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC252 && onConnectorClick(connectorC252)} 
      >
        {"C252_1 1"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(591.093 626.713)"
      >
        {"Light-Door Exit (BXXX)"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(49.362 633.373)"
      >
        {"1"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(80.345 633.373)"
      >
        {"1"}
      </text>
      <text
        className="door_circuit_svg__st20 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(58.88 633.373)"
      >
        {"X-001"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(49.362 646.668)"
      >
        {"8"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(80.345 646.668)"
      >
        {"8"}
      </text>
      <text
        className="door_circuit_svg__st20 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(58.88 646.668)"
      >
        {"X-001"}
      </text>
      <path d="M696.16 629.64h104.8z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(688.325 635.357)"
        style={{
            textShadow: highlightedText === 'C252_1_SP_DDR_GND,BK,0.35,600.0,FLRY-A'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"C252_1_SP_DDR_GND,BK,0.35,600.0,FLRY-A"}
      </text>
      <path d="M425.59 629.64h96.7z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(421.973 635.357)"
        style={{
            textShadow: highlightedText === 'X11_C252_1,BU/YE,0.35,2105.0,FLRY-A'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"X11_C252_1,BU/YE,0.35,2105.0,FLRY-A"}
      </text>
      <g
        id="door_circuit_svg__textdc6d74343c9511ef863102cae894abaf"
        transform="translate(312.18 278.62)"
      >
        <text
          id="door_circuit_svg__dc6d74343c9511ef863102cae894abaf"
          className="door_circuit_svg__st1 door_circuit_svg__st25"
          transform="translate(572.74 519.673)"
        >
          {"REV"}
        </text>
      </g>
      <path
        id="door_circuit_svg__dc847ced3c9511ef863102cae894abaf"
        markerEnd="url(#door_circuit_svg__arrowdc847ced3c9511ef863102cae894abafx)"
        markerStart="url(#door_circuit_svg__arrowdc847ced3c9511ef863102cae894abaf)"
        d="m1020.6 813.4.1-26.8"
        className="door_circuit_svg__st7"
      />
      <path
        id="door_circuit_svg__dc70acba3c9511ef863102cae894abaf"
        markerEnd="url(#door_circuit_svg__arrowdc70acba3c9511ef863102cae894abafx)"
        markerStart="url(#door_circuit_svg__arrowdc70acba3c9511ef863102cae894abaf)"
        d="M935.9 813.1v-26.9"
        className="door_circuit_svg__st7"
      />
      <g
        id="door_circuit_svg__textdc77a8313c9511ef863102cae894abaf"
        transform="translate(331.5 277.33)"
      >
        <text
          id="door_circuit_svg__dc77a8313c9511ef863102cae894abaf"
          className="door_circuit_svg__st1 door_circuit_svg__st25"
          transform="translate(608.186 517.307)"
        >
          {"DRAWN BY"}
        </text>
      </g>
      <path
        id="door_circuit_svg__dc8080c73c9511ef863102cae894abaf"
        markerEnd="url(#door_circuit_svg__arrowdc8080c73c9511ef863102cae894abafx)"
        markerStart="url(#door_circuit_svg__arrowdc8080c73c9511ef863102cae894abaf)"
        d="M1020.6 828.1v-14.3"
        className="door_circuit_svg__st7"
      />
      <path
        id="door_circuit_svg__dc8847f53c9511ef863102cae894abaf"
        markerEnd="url(#door_circuit_svg__arrowdc8847f53c9511ef863102cae894abafx)"
        markerStart="url(#door_circuit_svg__arrowdc8847f53c9511ef863102cae894abaf)"
        d="M1020.6 28.2V13.9"
        className="door_circuit_svg__st7"
      />
      <g
        id="door_circuit_svg__textdc8f14863c9511ef863102cae894abaf"
        transform="rotate(.057 -280156.269 372166.516)"
      >
        <text
          id="door_circuit_svg__dc8f14863c9511ef863102cae894abaf"
          className="door_circuit_svg__st1 door_circuit_svg__st25"
          transform="translate(675.62 516.569)"
        >
          {"SHEET"}
        </text>
      </g>
      <path
        id="door_circuit_svg__dc9e05a33c9511ef863102cae894abaf"
        markerEnd="url(#door_circuit_svg__arrowdc9e05a33c9511ef863102cae894abafx)"
        markerStart="url(#door_circuit_svg__arrowdc9e05a33c9511ef863102cae894abaf)"
        d="M1128.4 813.5v-26.9"
        className="door_circuit_svg__st7"
      />
      <g
        id="door_circuit_svg__textdca1d4bd3c9511ef863102cae894abaf"
        transform="translate(400.15 278.28)"
      >
        <text
          id="door_circuit_svg__dca1d4bd3c9511ef863102cae894abaf"
          className="door_circuit_svg__st1 door_circuit_svg__st25"
          transform="translate(734.133 519.05)"
        >
          {"SIZE"}
        </text>
      </g>
      <g
        id="door_circuit_svg__textdca4a7333c9511ef863102cae894abaf"
        transform="translate(400.18 282.2)"
      >
        <text
          id="door_circuit_svg__dca4a7333c9511ef863102cae894abaf"
          className="door_circuit_svg__st1 door_circuit_svg__st26"
          transform="translate(734.19 529.076)"
        >
          {"A3"}
        </text>
      </g>
      <path
        id="door_circuit_svg__dca76afc3c9511ef863102cae894abaf"
        markerEnd="url(#door_circuit_svg__arrowdca76afc3c9511ef863102cae894abafx)"
        markerStart="url(#door_circuit_svg__arrowdca76afc3c9511ef863102cae894abaf)"
        d="M1162.3 28.1V13.9"
        className="door_circuit_svg__st7"
      />
      <path
        id="door_circuit_svg__dcab8f253c9511ef863102cae894abaf"
        markerEnd="url(#door_circuit_svg__arrowdcab8f253c9511ef863102cae894abafx)"
        markerStart="url(#door_circuit_svg__arrowdcab8f253c9511ef863102cae894abaf)"
        d="M1162.3 827.8v-14.2"
        className="door_circuit_svg__st7"
      />
      <path
        id="door_circuit_svg__dcaf70e03c9511ef863102cae894abaf"
        d="m1176.5 682.7-14.2-.1"
        className="door_circuit_svg__st7"
      />
      <path
        id="door_circuit_svg__dcb379043c9511ef863102cae894abaf"
        d="m1176.7 551.9-14.2-.1"
        className="door_circuit_svg__st7"
      />
      <path
        id="door_circuit_svg__dcb75f3f3c9511ef863102cae894abaf"
        d="m1176.7 159.3-14.2-.1"
        className="door_circuit_svg__st7"
      />
      <path
        id="door_circuit_svg__dcbb54673c9511ef863102cae894abaf"
        d="M1176.8 420.9h-14.3"
        className="door_circuit_svg__st7"
      />
      <path
        id="door_circuit_svg__dcbf613b3c9511ef863102cae894abaf"
        d="m1176.9 290.1-14.3-.1"
        className="door_circuit_svg__st7"
      />
      <path
        id="door_circuit_svg__dbcc5db63c9511ef863102cae894abaf"
        d="M1190.6 841.9V0H0v841.9h1190.6"
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: 1.1339,
          strokeMiterlimit: 11.3386,
        }}
      />
      <path
        id="door_circuit_svg__dc07ab8d3c9511ef863102cae894abaf"
        markerEnd="url(#door_circuit_svg__arrowdc07ab8d3c9511ef863102cae894abafx)"
        markerStart="url(#door_circuit_svg__arrowdc07ab8d3c9511ef863102cae894abaf)"
        d="M170.2 28.3V14.1"
        className="door_circuit_svg__st7"
      />
      <path
        id="door_circuit_svg__dc5050083c9511ef863102cae894abaf"
        markerEnd="url(#door_circuit_svg__arrowdc5050083c9511ef863102cae894abafx)"
        markerStart="url(#door_circuit_svg__arrowdc5050083c9511ef863102cae894abaf)"
        d="M737.2 786.7v26.9"
        className="door_circuit_svg__st7"
      />
      <path
        id="door_circuit_svg__dc4c89253c9511ef863102cae894abaf"
        markerEnd="url(#door_circuit_svg__arrowdc4c89253c9511ef863102cae894abafx)"
        markerStart="url(#door_circuit_svg__arrowdc4c89253c9511ef863102cae894abaf)"
        d="M737.1 827.9v-14.2"
        className="door_circuit_svg__st7"
      />
      <path
        id="door_circuit_svg__dbfab2803c9511ef863102cae894abaf"
        markerEnd="url(#door_circuit_svg__arrowdbfab2803c9511ef863102cae894abafx)"
        markerStart="url(#door_circuit_svg__arrowdbfab2803c9511ef863102cae894abaf)"
        d="M28.4 28.3V14.1"
        className="door_circuit_svg__st7"
      />
      <path
        id="door_circuit_svg__dc3f88303c9511ef863102cae894abaf"
        markerEnd="url(#door_circuit_svg__arrowdc3f88303c9511ef863102cae894abafx)"
        markerStart="url(#door_circuit_svg__arrowdc3f88303c9511ef863102cae894abaf)"
        d="M595.4 828.1v-14.3"
        className="door_circuit_svg__st7"
      />
      <path
        id="door_circuit_svg__dc3ba3743c9511ef863102cae894abaf"
        markerEnd="url(#door_circuit_svg__arrowdc3ba3743c9511ef863102cae894abafx)"
        markerStart="url(#door_circuit_svg__arrowdc3ba3743c9511ef863102cae894abaf)"
        d="M595.4 28.2V14"
        className="door_circuit_svg__st7"
      />
      <path
        id="door_circuit_svg__dc3716593c9511ef863102cae894abaf"
        markerEnd="url(#door_circuit_svg__arrowdc3716593c9511ef863102cae894abafx)"
        markerStart="url(#door_circuit_svg__arrowdc3716593c9511ef863102cae894abaf)"
        d="m28.4 786.6 1133.7-.2"
        className="door_circuit_svg__st7"
      />
      <path
        id="door_circuit_svg__dc042f0f3c9511ef863102cae894abaf"
        markerEnd="url(#door_circuit_svg__arrowdc042f0f3c9511ef863102cae894abafx)"
        markerStart="url(#door_circuit_svg__arrowdc042f0f3c9511ef863102cae894abaf)"
        d="M170.1 813.6v-26.9"
        className="door_circuit_svg__st7"
      />
      <path
        id="door_circuit_svg__dc48b6e73c9511ef863102cae894abaf"
        markerEnd="url(#door_circuit_svg__arrowdc48b6e73c9511ef863102cae894abafx)"
        markerStart="url(#door_circuit_svg__arrowdc48b6e73c9511ef863102cae894abaf)"
        d="M737.1 28.1V13.9"
        className="door_circuit_svg__st7"
      />
      <path
        id="door_circuit_svg__dc0b4a073c9511ef863102cae894abaf"
        markerEnd="url(#door_circuit_svg__arrowdc0b4a073c9511ef863102cae894abafx)"
        markerStart="url(#door_circuit_svg__arrowdc0b4a073c9511ef863102cae894abaf)"
        d="M170.2 827.9v-14.2"
        className="door_circuit_svg__st7"
      />
      <g
        id="door_circuit_svg__textdc0ee8653c9511ef863102cae894abaf"
        transform="translate(61.64 280.46)"
      >
        <text
          id="door_circuit_svg__dc0ee8653c9511ef863102cae894abaf"
          className="door_circuit_svg__st1"
          style={{
            fontSize: "17.0079px",
          }}
          transform="translate(113.088 531.553)"
        >
          {"Sheet 1"}
        </text>
      </g>
      <g
        id="door_circuit_svg__textdc11a4fc3c9511ef863102cae894abaf"
        transform="translate(61.78 278.17)"
      >
        <text
          id="door_circuit_svg__dc11a4fc3c9511ef863102cae894abaf"
          className="door_circuit_svg__st1 door_circuit_svg__st25"
          transform="translate(113.345 518.848)"
        >
          {"DESCRIPTION"}
        </text>
      </g>
      <path
        id="door_circuit_svg__dc2b68993c9511ef863102cae894abaf"
        markerEnd="url(#door_circuit_svg__arrowdc2b68993c9511ef863102cae894abafx)"
        markerStart="url(#door_circuit_svg__arrowdc2b68993c9511ef863102cae894abaf)"
        d="M453.7 28.2V14"
        className="door_circuit_svg__st7"
      />
      <path
        id="door_circuit_svg__dc27988d3c9511ef863102cae894abaf"
        markerEnd="url(#door_circuit_svg__arrowdc27988d3c9511ef863102cae894abafx)"
        markerStart="url(#door_circuit_svg__arrowdc27988d3c9511ef863102cae894abaf)"
        d="M453.6 828v-14.2"
        className="door_circuit_svg__st7"
      />
      <path
        id="door_circuit_svg__dc1abce13c9511ef863102cae894abaf"
        markerEnd="url(#door_circuit_svg__arrowdc1abce13c9511ef863102cae894abafx)"
        markerStart="url(#door_circuit_svg__arrowdc1abce13c9511ef863102cae894abaf)"
        d="M311.9 28.2V14"
        className="door_circuit_svg__st7"
      />
      <path
        id="door_circuit_svg__dc1e539e3c9511ef863102cae894abaf"
        markerEnd="url(#door_circuit_svg__arrowdc1e539e3c9511ef863102cae894abafx)"
        markerStart="url(#door_circuit_svg__arrowdc1e539e3c9511ef863102cae894abaf)"
        d="M311.9 828v-14.2"
        className="door_circuit_svg__st7"
      />
      <path
        id="door_circuit_svg__dbe23a0e3c9511ef863102cae894abaf"
        d="m28.1 159.3-14.2-.1"
        className="door_circuit_svg__st7"
      />
      <path
        id="door_circuit_svg__dc66d6893c9511ef863102cae894abaf"
        markerEnd="url(#door_circuit_svg__arrowdc66d6893c9511ef863102cae894abafx)"
        markerStart="url(#door_circuit_svg__arrowdc66d6893c9511ef863102cae894abaf)"
        d="M878.9 828.1v-14.3"
        className="door_circuit_svg__st7"
      />
      <path
        id="door_circuit_svg__dc632f1a3c9511ef863102cae894abaf"
        markerEnd="url(#door_circuit_svg__arrowdc632f1a3c9511ef863102cae894abafx)"
        markerStart="url(#door_circuit_svg__arrowdc632f1a3c9511ef863102cae894abaf)"
        d="M878.9 813.5v-27"
        className="door_circuit_svg__st7"
      />
      <path
        id="door_circuit_svg__dc5f6abb3c9511ef863102cae894abaf"
        markerEnd="url(#door_circuit_svg__arrowdc5f6abb3c9511ef863102cae894abafx)"
        markerStart="url(#door_circuit_svg__arrowdc5f6abb3c9511ef863102cae894abaf)"
        d="M878.9 28.2V13.9"
        className="door_circuit_svg__st7"
      />
      <g
        id="door_circuit_svg__textdc53e96b3c9511ef863102cae894abaf"
        transform="translate(261.46 278.64)"
      >
        <text
          id="door_circuit_svg__dc53e96b3c9511ef863102cae894abaf"
          className="door_circuit_svg__st1 door_circuit_svg__st25"
          transform="translate(479.687 519.71)"
        >
          {"PART NUMBER"}
        </text>
      </g>
      <path
        id="door_circuit_svg__dbe57a913c9511ef863102cae894abaf"
        d="m28.1 551.9-14.2-.1"
        className="door_circuit_svg__st7"
      />
      <path
        id="door_circuit_svg__dbe8dd6d3c9511ef863102cae894abaf"
        d="M28.2 420.9H13.9"
        className="door_circuit_svg__st7"
      />
      <path
        id="door_circuit_svg__dbec43f43c9511ef863102cae894abaf"
        d="M28.3 290.1 14 290"
        className="door_circuit_svg__st7"
      />
      <path
        id="door_circuit_svg__dbef4cc63c9511ef863102cae894abaf"
        d="m28.3 682.7-14.3-.1"
        className="door_circuit_svg__st7"
      />
      <path
        id="door_circuit_svg__dbf23f223c9511ef863102cae894abaf"
        d="M1162.2 813.6V28.4H28.4v785.2h1133.8"
        className="door_circuit_svg__st7"
      />
      <path
        id="door_circuit_svg__dbf7b76c3c9511ef863102cae894abaf"
        markerEnd="url(#door_circuit_svg__arrowdbf7b76c3c9511ef863102cae894abafx)"
        markerStart="url(#door_circuit_svg__arrowdbf7b76c3c9511ef863102cae894abaf)"
        d="M28.4 827.9v-14.2"
        className="door_circuit_svg__st7"
      />
      <text
        className="door_circuit_svg__st20 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(58.144 252.482)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorX11A && onConnectorClick(connectorX11A)}
      >
        {"X11_A"}
      </text>
      <path d="M727.4 117.5h102.1z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(719.179 123.166)"
        style={{
            textShadow: highlightedText === 'C010_SP_DR_DOORILLU,GY/BN,0.35,1360.0'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"C010_SP_DR_DOORILLU,GY/BN,0.35,1360.0"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(365.78 553.635)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC262 && onConnectorClick(connectorC262)}
      >
        {"C262 10"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(367.357 540.34)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC262 && onConnectorClick(connectorC262)}
      >
        {"C262 8"}
      </text>
      <path d="M398.86 673.96h110.2z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(394.48 679.635)"
        style={{
            textShadow: highlightedText === 'X11_C059_1_1,YE/RD,2.5,1760.0,ALL,FLRY-B'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"X11_C059_1_1,YE/RD,2.5,1760.0,ALL,FLRY-B"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(49.362 398.637)"
      >
        {"6"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(80.345 398.637)"
      >
        {"6"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(49.362 411.932)"
      >
        {"7"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(80.345 411.932)"
      >
        {"7"}
      </text>
      <path d="M732.5 102.6h94z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(728.633 108.283)"
        style={{
            textShadow: highlightedText === 'GND-P-02_C010,BK,0.35,635.0,FLRY-A'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"GND-P-02_C010,BK,0.35,635.0,FLRY-A"}
      </text>
      <path d="M269.92 301.92h115.6z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(265.39 307.615)"
        style={{
            textShadow: highlightedText === 'X11_C095_1_1,GY/VT,0.35,1760.0,TP_1,FLRY-A'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"X11_C095_1_1,GY/VT,0.35,1760.0,TP_1,FLRY-A"}
      </text>
      <path d="M398.86 687.25h110.2z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(393.382 692.93)"
        style={{
            textShadow: highlightedText === 'X11_C059_1_2,WH/GN,2.5,1760.0,ALL,FLRY-B'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"X11_C059_1_2,WH/GN,2.5,1760.0,ALL,FLRY-B"}
      </text>
      <path d="M280.72 195.62h94z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(277.208 201.316)"
        style={{
            textShadow: highlightedText === 'X11_C61_4,GY/YE,0.35,1625.0,FLRY-A'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"X11_C61_4,GY/YE,0.35,1625.0,FLRY-A"}
      </text>
      <path d="M269.92 288.63h115.6z" className="door_circuit_svg__st21" />
      <text
        className="door_circuit_svg__st22 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(264.76 294.322)"
        style={{
            textShadow: highlightedText === 'X11_C095_1_2,VT/OG,0.35,1760.0,TP_1,FLRY-A'
      ? '2px 2px 4px yellow, -2px -2px 4px yellow'
      : 'none', 
          }}
      >
        {"X11_C095_1_2,VT/OG,0.35,1760.0,TP_1,FLRY-A"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(49.362 146.184)"
      >
        {"5"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(80.345 146.184)"
      >
        {"5"}
      </text>
      <text
        className="door_circuit_svg__st20 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(58.144 146.184)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorX11B && onConnectorClick(connectorX11B)}
      >
        {"X11_B"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(1138.915 106.299)"
      >
        {"7"}
      </text>
      <text
        className="door_circuit_svg__st19 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(1107.933 106.299)"
      >
        {"7"}
      </text>
      <text
        className="door_circuit_svg__st20 door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(1116.686 106.299)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorX11B && onConnectorClick(connectorX11B)}
      >
        {"X11_B"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(560 225.893)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC061 && onConnectorClick(connectorC061)} 
      >
        {"C061 1"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(560 239.188)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC061 && onConnectorClick(connectorC061)} 
      >
        {"C061 2"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(560 252.453)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC061 && onConnectorClick(connectorC061)} 
      >
        {"C061 3"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(560 199.305)"
        style={{ cursor: 'pointer', fill: 'blue' }}
        onClick={() => connectorC061 && onConnectorClick(connectorC061)} 
      >
        {"C061 4"}
      </text>
      <text
        className="door_circuit_svg__st1 door_circuit_svg__st2"
        transform="translate(583.374 192.047)"
      >
        {"Module-Door Control (DXXX)"}
      </text>
      <g id="door_circuit_svg__layer_76">
        <g
          id="door_circuit_svg__textdbff45e33c9511ef863102cae894abaf"
          transform="translate(34.5 4.53)"
        >
          <text
            id="door_circuit_svg__dbff45e33c9511ef863102cae894abaf"
            className="door_circuit_svg__st1 door_circuit_svg__st26"
            transform="translate(60.143 19.65)"
          >
            {"1"}
          </text>
        </g>
        <g
          id="door_circuit_svg__textdc01a7213c9511ef863102cae894abaf"
          transform="translate(35.09 290.15)"
        >
          <text
            id="door_circuit_svg__dc01a7213c9511ef863102cae894abaf"
            className="door_circuit_svg__st1 door_circuit_svg__st26"
            transform="translate(61.224 543.662)"
          >
            {"1"}
          </text>
        </g>
        <g
          id="door_circuit_svg__textdbdf83603c9511ef863102cae894abaf"
          transform="translate(5.55 261.36)"
        >
          <text
            id="door_circuit_svg__dbdf83603c9511ef863102cae894abaf"
            className="door_circuit_svg__st1 door_circuit_svg__st26"
            transform="translate(6.72 490.842)"
          >
            {"F"}
          </text>
        </g>
        <g
          id="door_circuit_svg__textdbdd11743c9511ef863102cae894abaf"
          transform="translate(5.42 216.29)"
        >
          <text
            id="door_circuit_svg__dbdd11743c9511ef863102cae894abaf"
            className="door_circuit_svg__st1 door_circuit_svg__st26"
            transform="translate(6.163 408.155)"
          >
            {"E"}
          </text>
        </g>
        <g
          id="door_circuit_svg__textdbda9a4d3c9511ef863102cae894abaf"
          transform="translate(5.36 126.1)"
        >
          <text
            id="door_circuit_svg__dbda9a4d3c9511ef863102cae894abaf"
            className="door_circuit_svg__st1 door_circuit_svg__st26"
            transform="translate(5.74 242.687)"
          >
            {"C"}
          </text>
        </g>
        <g
          id="door_circuit_svg__textdbd7da193c9511ef863102cae894abaf"
          transform="translate(5.36 31.1)"
        >
          <text
            id="door_circuit_svg__dbd7da193c9511ef863102cae894abaf"
            className="door_circuit_svg__st1 door_circuit_svg__st26"
            transform="translate(6.052 68.396)"
          >
            {"A"}
          </text>
        </g>
        <g
          id="door_circuit_svg__textdc14a8863c9511ef863102cae894abaf"
          transform="translate(84.49 4.62)"
        >
          <text
            id="door_circuit_svg__dc14a8863c9511ef863102cae894abaf"
            className="door_circuit_svg__st1 door_circuit_svg__st26"
            transform="translate(151.857 19.816)"
          >
            {"2"}
          </text>
        </g>
        <g
          id="door_circuit_svg__textdc1773ea3c9511ef863102cae894abaf"
          transform="translate(85.08 290.24)"
        >
          <text
            id="door_circuit_svg__dc1773ea3c9511ef863102cae894abaf"
            className="door_circuit_svg__st1 door_circuit_svg__st26"
            transform="translate(152.939 543.826)"
          >
            {"2"}
          </text>
        </g>
        <g
          id="door_circuit_svg__textdc6aaec23c9511ef863102cae894abaf"
          transform="translate(312.16 282.22)"
        >
          <text
            id="door_circuit_svg__dc6aaec23c9511ef863102cae894abaf"
            className="door_circuit_svg__st1 door_circuit_svg__st26"
            transform="translate(572.703 529.113)"
          >
            {"A"}
          </text>
        </g>
        <g
          id="door_circuit_svg__textdbd538673c9511ef863102cae894abaf"
          transform="translate(5.36 173.6)"
        >
          <text
            id="door_circuit_svg__dbd538673c9511ef863102cae894abaf"
            className="door_circuit_svg__st1 door_circuit_svg__st26"
            transform="translate(5.74 329.834)"
          >
            {"D"}
          </text>
        </g>
        <g
          id="door_circuit_svg__textdc45f0d33c9511ef863102cae894abaf"
          transform="translate(234.82 289.99)"
        >
          <text
            id="door_circuit_svg__dc45f0d33c9511ef863102cae894abaf"
            className="door_circuit_svg__st1 door_circuit_svg__st26"
            transform="translate(427.659 543.367)"
          >
            {"5"}
          </text>
        </g>
        <g
          id="door_circuit_svg__textdc7460d13c9511ef863102cae894abaf"
          transform="translate(331.26 281.01)"
        >
          <text
            id="door_circuit_svg__dc7460d13c9511ef863102cae894abaf"
            className="door_circuit_svg__st1 door_circuit_svg__st26"
            transform="translate(607.745 526.892)"
          >
            {"George Barnes"}
          </text>
        </g>
        <g
          id="door_circuit_svg__textdc7aa6973c9511ef863102cae894abaf"
          transform="translate(334.75 4.42)"
        >
          <text
            id="door_circuit_svg__dc7aa6973c9511ef863102cae894abaf"
            className="door_circuit_svg__st1 door_circuit_svg__st26"
            transform="translate(610.995 19.447)"
          >
            {"7"}
          </text>
        </g>
        <g
          id="door_circuit_svg__textdc7d789d3c9511ef863102cae894abaf"
          transform="translate(335.34 290.04)"
        >
          <text
            id="door_circuit_svg__dc7d789d3c9511ef863102cae894abaf"
            className="door_circuit_svg__st1 door_circuit_svg__st26"
            transform="translate(612.077 543.459)"
          >
            {"7"}
          </text>
        </g>
        <g
          id="door_circuit_svg__textdc5cada43c9511ef863102cae894abaf"
          transform="translate(284.85 290.06)"
        >
          <text
            id="door_circuit_svg__dc5cada43c9511ef863102cae894abaf"
            className="door_circuit_svg__st1 door_circuit_svg__st26"
            transform="translate(519.446 543.497)"
          >
            {"6"}
          </text>
        </g>
        <g
          id="door_circuit_svg__textdbd275ea3c9511ef863102cae894abaf"
          transform="translate(5.36 78.6)"
        >
          <text
            id="door_circuit_svg__dbd275ea3c9511ef863102cae894abaf"
            className="door_circuit_svg__st1 door_circuit_svg__st26"
            transform="translate(6.052 155.543)"
          >
            {"B"}
          </text>
        </g>
        <g
          id="door_circuit_svg__textdc59df653c9511ef863102cae894abaf"
          transform="translate(284.26 4.44)"
        >
          <text
            id="door_circuit_svg__dc59df653c9511ef863102cae894abaf"
            className="door_circuit_svg__st1 door_circuit_svg__st26"
            transform="translate(518.364 19.484)"
          >
            {"6"}
          </text>
        </g>
        <g
          id="door_circuit_svg__textdc8c59463c9511ef863102cae894abaf"
          transform="translate(367.51 281.01)"
        >
          <text
            id="door_circuit_svg__dc8c59463c9511ef863102cae894abaf"
            className="door_circuit_svg__st1 door_circuit_svg__st26"
            transform="translate(674.25 526.892)"
          >
            {"1"}
          </text>
        </g>
        <g
          id="door_circuit_svg__textdc56eb8b3c9511ef863102cae894abaf"
          transform="translate(261.46 282.22)"
        >
          <text
            id="door_circuit_svg__dc56eb8b3c9511ef863102cae894abaf"
            className="door_circuit_svg__st1 door_circuit_svg__st26"
            transform="translate(479.687 529.113)"
          >
            {"INEOS-XXXXX-A"}
          </text>
        </g>
        <g
          id="door_circuit_svg__textdc9218cd3c9511ef863102cae894abaf"
          transform="translate(375.96 281.12)"
        >
          <text
            id="door_circuit_svg__dc9218cd3c9511ef863102cae894abaf"
            className="door_circuit_svg__st1 door_circuit_svg__st26"
            transform="translate(689.754 527.095)"
          >
            {"OF"}
          </text>
        </g>
        <g
          id="door_circuit_svg__textdc9549d23c9511ef863102cae894abaf"
          transform="translate(384.17 4.33)"
        >
          <text
            id="door_circuit_svg__dc9549d23c9511ef863102cae894abaf"
            className="door_circuit_svg__st1 door_circuit_svg__st26"
            transform="translate(701.663 19.283)"
          >
            {"8"}
          </text>
        </g>
        <g
          id="door_circuit_svg__textdc98191f3c9511ef863102cae894abaf"
          transform="translate(384.76 289.95)"
        >
          <text
            id="door_circuit_svg__dc98191f3c9511ef863102cae894abaf"
            className="door_circuit_svg__st1 door_circuit_svg__st26"
            transform="translate(702.746 543.294)"
          >
            {"8"}
          </text>
        </g>
        <g
          id="door_circuit_svg__textdc9af4b93c9511ef863102cae894abaf"
          transform="translate(385.07 281.04)"
        >
          <text
            id="door_circuit_svg__dc9af4b93c9511ef863102cae894abaf"
            className="door_circuit_svg__st1 door_circuit_svg__st26"
            transform="translate(706.467 526.947)"
          >
            {"1"}
          </text>
        </g>
        <g
          id="door_circuit_svg__textdc21d3413c9511ef863102cae894abaf"
          transform="translate(134.15 4.52)"
        >
          <text
            id="door_circuit_svg__dc21d3413c9511ef863102cae894abaf"
            className="door_circuit_svg__st1 door_circuit_svg__st26"
            transform="translate(242.965 19.632)"
          >
            {"3"}
          </text>
        </g>
        <g
          id="door_circuit_svg__textdc42dbd63c9511ef863102cae894abaf"
          transform="translate(234.23 4.37)"
        >
          <text
            id="door_circuit_svg__dc42dbd63c9511ef863102cae894abaf"
            className="door_circuit_svg__st1 door_circuit_svg__st26"
            transform="translate(426.577 19.357)"
          >
            {"5"}
          </text>
        </g>
        <g
          id="door_circuit_svg__textdc31e1f53c9511ef863102cae894abaf"
          transform="translate(184.86 289.95)"
        >
          <text
            id="door_circuit_svg__dc31e1f53c9511ef863102cae894abaf"
            className="door_circuit_svg__st1 door_circuit_svg__st26"
            transform="translate(336 543.294)"
          >
            {"4"}
          </text>
        </g>
        <g
          id="door_circuit_svg__textdcc35cc43c9511ef863102cae894abaf"
          transform="translate(415.59 173.61)"
        >
          <text
            id="door_circuit_svg__dcc35cc43c9511ef863102cae894abaf"
            className="door_circuit_svg__st1 door_circuit_svg__st26"
            transform="translate(758.366 329.85)"
          >
            {"D"}
          </text>
        </g>
        <g
          id="door_circuit_svg__textdcc647ec3c9511ef863102cae894abaf"
          transform="translate(415.59 31.11)"
        >
          <text
            id="door_circuit_svg__dcc647ec3c9511ef863102cae894abaf"
            className="door_circuit_svg__st1 door_circuit_svg__st26"
            transform="translate(758.68 68.415)"
          >
            {"A"}
          </text>
        </g>
        <g
          id="door_circuit_svg__textdcc9639a3c9511ef863102cae894abaf"
          transform="translate(415.59 78.61)"
        >
          <text
            id="door_circuit_svg__dcc9639a3c9511ef863102cae894abaf"
            className="door_circuit_svg__st1 door_circuit_svg__st26"
            transform="translate(758.68 155.56)"
          >
            {"B"}
          </text>
        </g>
        <g
          id="door_circuit_svg__textdccc31603c9511ef863102cae894abaf"
          transform="translate(415.59 126.11)"
        >
          <text
            id="door_circuit_svg__dccc31603c9511ef863102cae894abaf"
            className="door_circuit_svg__st1 door_circuit_svg__st26"
            transform="translate(758.366 242.706)"
          >
            {"C"}
          </text>
        </g>
        <g
          id="door_circuit_svg__textdccf0a283c9511ef863102cae894abaf"
          transform="translate(415.65 216.3)"
        >
          <text
            id="door_circuit_svg__dccf0a283c9511ef863102cae894abaf"
            className="door_circuit_svg__st1 door_circuit_svg__st26"
            transform="translate(758.79 408.173)"
          >
            {"E"}
          </text>
        </g>
        <g
          id="door_circuit_svg__textdcd1ddde3c9511ef863102cae894abaf"
          transform="translate(415.78 261.37)"
        >
          <text
            id="door_circuit_svg__dcd1ddde3c9511ef863102cae894abaf"
            className="door_circuit_svg__st1 door_circuit_svg__st26"
            transform="translate(759.346 490.86)"
          >
            {"F"}
          </text>
        </g>
        <g
          id="door_circuit_svg__textdc2f27bf3c9511ef863102cae894abaf"
          transform="translate(184.27 4.33)"
        >
          <text
            id="door_circuit_svg__dc2f27bf3c9511ef863102cae894abaf"
            className="door_circuit_svg__st1 door_circuit_svg__st26"
            transform="translate(334.918 19.283)"
          >
            {"4"}
          </text>
        </g>
        <g
          id="door_circuit_svg__textdc24fb403c9511ef863102cae894abaf"
          transform="translate(134.74 290.14)"
        >
          <text
            id="door_circuit_svg__dc24fb403c9511ef863102cae894abaf"
            className="door_circuit_svg__st1 door_circuit_svg__st26"
            transform="translate(244.047 543.643)"
          >
            {"3"}
          </text>
        </g>
      </g>
      <g>
        <path
          id="door_circuit_svg__X11_A-P-1_female"
          d="M67.2 497.3c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2"
          className="door_circuit_svg__st7"
        />
        <circle
          id="door_circuit_svg__X11_A-P-1_male"
          cx={67.5}
          cy={500.5}
          r={1.6}
          className="door_circuit_svg__st7"
        />
      </g>
      <g>
        <path
          id="door_circuit_svg__X11_A-P-2_female"
          d="M67.2 510.6c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2"
          className="door_circuit_svg__st7"
        />
        <circle
          id="door_circuit_svg__X11_A-P-2_male"
          cx={67.5}
          cy={513.8}
          r={1.6}
          className="door_circuit_svg__st7"
        />
      </g>
      <g>
        <path
          id="door_circuit_svg__X11_A-P-5_female"
          d="M67.2 67.7c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2"
          className="door_circuit_svg__st7"
        />
        <circle
          id="door_circuit_svg__X11_A-P-5_male"
          cx={67.5}
          cy={70.9}
          r={1.6}
          className="door_circuit_svg__st7"
        />
      </g>
      <g>
        <path
          id="door_circuit_svg__X11_A-P-3_female"
          d="M67.2 523.9c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2"
          className="door_circuit_svg__st7"
        />
        <circle
          id="door_circuit_svg__X11_A-P-3_male"
          cx={67.5}
          cy={527.1}
          r={1.6}
          className="door_circuit_svg__st7"
        />
      </g>
      <g>
        <path
          id="door_circuit_svg__X11_A-P-10_female"
          d="M67.2 537.2c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2"
          className="door_circuit_svg__st7"
        />
        <circle
          id="door_circuit_svg__X11_A-P-10_male"
          cx={67.5}
          cy={540.4}
          r={1.6}
          className="door_circuit_svg__st7"
        />
      </g>
      <path
        d="M584.6 394.2h70.9v70.9h-70.9zM582.4 416.4h2.2M582.4 442.9h2.2M582.4 456.2h2.2M582.4 403.1h2.2M657.7 411.9h-2.2M657.7 425.2h-2.2"
        className="door_circuit_svg__st7"
      />
      <g>
        <path
          id="door_circuit_svg__X11_A-P-4_female"
          d="M67.2 54.4c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2"
          className="door_circuit_svg__st7"
        />
        <circle
          id="door_circuit_svg__X11_A-P-4_male"
          cx={67.5}
          cy={57.6}
          r={1.6}
          className="door_circuit_svg__st7"
        />
      </g>
      <path
        d="M584.6 673.2h70.9v31h-70.9zM582.4 695.4h2.2M582.4 682.1h2.2M584.6 48.7h70.9v31h-70.9zM582.4 57.6h2.2M582.4 70.9h2.2M292.3 491.6h70.9v88.6h-70.9zM290.1 527h2.2M290.1 540.3h2.2M290.1 500.5h2.2M290.1 513.8h2.2M365.4 571.4h-2.2M365.4 504.9h-2.2M365.4 558.1h-2.2M365.4 544.8h-2.2"
        className="door_circuit_svg__st7"
      />
      <g>
        <path
          id="door_circuit_svg__X11_A-P-15_female"
          d="M67.2 293.6c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2"
          className="door_circuit_svg__st7"
        />
        <circle
          id="door_circuit_svg__X11_A-P-15_male"
          cx={67.5}
          cy={296.8}
          r={1.6}
          className="door_circuit_svg__st7"
        />
      </g>
      <g>
        <path
          id="door_circuit_svg__X11_A-P-16_female"
          d="M67.2 306.9c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2"
          className="door_circuit_svg__st7"
        />
        <circle
          id="door_circuit_svg__X11_A-P-16_male"
          cx={67.5}
          cy={310.1}
          r={1.6}
          className="door_circuit_svg__st7"
        />
      </g>
      <path
        d="M584.6 535.9h70.9v75.3h-70.9zM582.4 571.4h2.2M582.4 602.4h2.2M582.4 544.8h2.2M582.4 589.1h2.2M582.4 558.1h2.2"
        className="door_circuit_svg__st7"
      />
      <g>
        <path
          id="door_circuit_svg__X11_B-P-10_female"
          d="M67.2 439.7c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2"
          className="door_circuit_svg__st7"
        />
        <circle
          id="door_circuit_svg__X11_B-P-10_male"
          cx={67.5}
          cy={442.9}
          r={1.6}
          className="door_circuit_svg__st7"
        />
      </g>
      <path
        d="M584.6 287.9h70.9v31h-70.9zM582.4 310.1h2.2M582.4 296.8h2.2M584.6 341h70.9v31h-70.9zM657.7 349.9h-2.2M657.7 363.2h-2.2"
        className="door_circuit_svg__st7"
      />
      <circle cx={859.3} cy={150.6} r={1.8} className="door_circuit_svg__st7" />
      <g>
        <path
          id="door_circuit_svg__X11_B-P-12_female"
          d="M67.2 103.1c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2"
          className="door_circuit_svg__st7"
        />
        <circle
          id="door_circuit_svg__X11_B-P-12_male"
          cx={67.5}
          cy={106.3}
          r={1.6}
          className="door_circuit_svg__st7"
        />
      </g>
      <g>
        <path
          id="door_circuit_svg__X11_B-P-13_female"
          d="M67.2 116.4c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2"
          className="door_circuit_svg__st7"
        />
        <circle
          id="door_circuit_svg__X11_B-P-13_male"
          cx={67.5}
          cy={119.6}
          r={1.6}
          className="door_circuit_svg__st7"
        />
      </g>
      <g>
        <path
          id="door_circuit_svg__X11_B-P-6_female"
          d="M67.2 129.7c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2"
          className="door_circuit_svg__st7"
        />
        <circle
          id="door_circuit_svg__X11_B-P-6_male"
          cx={67.5}
          cy={132.9}
          r={1.6}
          className="door_circuit_svg__st7"
        />
      </g>
      <path
        id="door_circuit_svg__X11_B-P-9_female"
        d="M67.2 453c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2"
        className="door_circuit_svg__st7"
      />
      <circle
        id="door_circuit_svg__X11_B-P-9_male"
        cx={67.5}
        cy={456.2}
        r={1.6}
        className="door_circuit_svg__st7"
      />
      <g>
        <path
          id="door_circuit_svg__X11_B-P-1_female"
          d="M69.4 678.9c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2"
          className="door_circuit_svg__st7"
        />
        <circle
          id="door_circuit_svg__X11_B-P-1_male"
          cx={69.7}
          cy={682.1}
          r={1.6}
          className="door_circuit_svg__st7"
        />
      </g>
      <g>
        <path
          id="door_circuit_svg__X11_B-P-8_female"
          d="M69.4 692.2c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2"
          className="door_circuit_svg__st7"
        />
        <circle
          id="door_circuit_svg__X11_B-P-8_male"
          cx={69.7}
          cy={695.4}
          r={1.6}
          className="door_circuit_svg__st7"
        />
      </g>
      <circle cx={925.7} cy={110.7} r={1.8} className="door_circuit_svg__st7" />
      <g>
        <path
          id="door_circuit_svg__X11_B-P-2_female"
          d="M67.2 599.2c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2"
          className="door_circuit_svg__st7"
        />
        <circle
          id="door_circuit_svg__X11_B-P-2_male"
          cx={67.5}
          cy={602.4}
          r={1.6}
          className="door_circuit_svg__st7"
        />
      </g>
      <g>
        <path
          id="door_circuit_svg__X11_B-P-3_female"
          d="M67.2 585.9c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2"
          className="door_circuit_svg__st7"
        />
        <circle
          id="door_circuit_svg__X11_B-P-3_male"
          cx={67.5}
          cy={589.1}
          r={1.6}
          className="door_circuit_svg__st7"
        />
      </g>
      <g>
        <path
          id="door_circuit_svg__X11_A-P-8_female"
          d="M67.2 200.6c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2"
          className="door_circuit_svg__st7"
        />
        <circle
          id="door_circuit_svg__X11_A-P-8_male"
          cx={67.5}
          cy={203.8}
          r={1.6}
          className="door_circuit_svg__st7"
        />
      </g>
      <g>
        <path
          id="door_circuit_svg__X11_A-P-9_female"
          d="M67.2 213.9c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2"
          className="door_circuit_svg__st7"
        />
        <circle
          id="door_circuit_svg__X11_A-P-9_male"
          cx={67.5}
          cy={217}
          r={1.6}
          className="door_circuit_svg__st7"
        />
      </g>
      <g>
        <path
          id="door_circuit_svg__X11_A-P-12_female"
          d="M67.2 227.1c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2"
          className="door_circuit_svg__st7"
        />
        <circle
          id="door_circuit_svg__X11_A-P-12_male"
          cx={67.5}
          cy={230.3}
          r={1.6}
          className="door_circuit_svg__st7"
        />
      </g>
      <g>
        <path
          id="door_circuit_svg__X11_A-P-13_female"
          d="M67.2 240.4c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2"
          className="door_circuit_svg__st7"
        />
        <circle
          id="door_circuit_svg__X11_A-P-13_male"
          cx={67.5}
          cy={243.6}
          r={1.6}
          className="door_circuit_svg__st7"
        />
      </g>
      <g>
        <path
          id="door_circuit_svg__X11_A-P-14_female"
          d="M67.2 253.7c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2"
          className="door_circuit_svg__st7"
        />
        <circle
          id="door_circuit_svg__X11_A-P-14_male"
          cx={67.5}
          cy={256.9}
          r={1.6}
          className="door_circuit_svg__st7"
        />
      </g>
      <path
        d="M584.6 97.5h70.9v44.3h-70.9zM582.4 119.6h2.2M582.4 132.9h2.2M582.4 106.3h2.2M657.7 124h-2.2M657.7 110.7h-2.2M584.6 628.9h70.9v17.7h-70.9zM582.4 637.8h2.2M657.7 637.8h-2.2"
        className="door_circuit_svg__st7"
      />
      <g>
        <path
          id="door_circuit_svg__X-001-P-1_female"
          d="M67.2 634.6c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2"
          className="door_circuit_svg__st7"
        />
        <circle
          id="door_circuit_svg__X-001-P-1_male"
          cx={67.5}
          cy={637.8}
          r={1.6}
          className="door_circuit_svg__st7"
        />
      </g>
      <g>
        <path
          id="door_circuit_svg__X-001-P-8_female"
          d="M67.2 647.9c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2"
          className="door_circuit_svg__st7"
        />
        <circle
          id="door_circuit_svg__X-001-P-8_male"
          cx={67.5}
          cy={651.1}
          r={1.6}
          className="door_circuit_svg__st7"
        />
      </g>
      <g>
        <path
          id="door_circuit_svg__X11_A-P-6_female"
          d="M67.2 399.9c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2"
          className="door_circuit_svg__st7"
        />
        <circle
          id="door_circuit_svg__X11_A-P-6_male"
          cx={67.5}
          cy={403.1}
          r={1.6}
          className="door_circuit_svg__st7"
        />
      </g>
      <g>
        <path
          id="door_circuit_svg__X11_A-P-7_female"
          d="M67.2 413.2c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2"
          className="door_circuit_svg__st7"
        />
        <circle
          id="door_circuit_svg__X11_A-P-7_male"
          cx={67.5}
          cy={416.4}
          r={1.6}
          className="door_circuit_svg__st7"
        />
      </g>
      <g>
        <path
          id="door_circuit_svg__X11_B-P-5_female"
          d="M67.2 147.4c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2"
          className="door_circuit_svg__st7"
        />
        <circle
          id="door_circuit_svg__X11_B-P-5_male"
          cx={67.5}
          cy={150.6}
          r={1.6}
          className="door_circuit_svg__st7"
        />
      </g>
      <g transform="matrix(-1 0 0 1 6 0)">
        <path
          id="door_circuit_svg__X11_B-P-7_female"
          d="M-1118.3 107.5c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2"
          className="door_circuit_svg__st7"
        />
        <circle
          id="door_circuit_svg__X11_B-P-7_male"
          cx={-1117.9}
          cy={110.7}
          r={1.6}
          className="door_circuit_svg__st7"
        />
      </g>
      <path
        d="M584.6 194.9h70.9v70.9h-70.9zM582.4 230.3h2.2M582.4 243.6h2.2M582.4 256.9h2.2M582.4 203.8h2.2M582.4 217h2.2M657.7 212.6h-2.2"
        className="door_circuit_svg__st7"
      />
      <circle
        id="door_circuit_svg___x30_bc912e03e2e11ef863102cae894abaf_x5F_male"
        cx={63.9}
        cy={500.5}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg___x30_bd0b2033e2e11ef863102cae894abaf_x5F_male"
        cx={69}
        cy={500.5}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg___x30_be498db3e2e11ef863102cae894abaf_x5F_male"
        cx={63.9}
        cy={513.8}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg___x30_beb77c23e2e11ef863102cae894abaf_x5F_male"
        cx={69}
        cy={513.8}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg___x31_7f1daee3c9f11ef863102cae894abaf_x5F_male"
        cx={63.9}
        cy={70.9}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg___x31_7f843ad3c9f11ef863102cae894abaf_x5F_male"
        cx={69}
        cy={70.9}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg___x31_aa0ee773e2e11ef863102cae894abaf_x5F_male"
        cx={63.9}
        cy={527.1}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg___x31_aa7d5763e2e11ef863102cae894abaf_x5F_male"
        cx={69}
        cy={527.1}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg___x31_ab983ab3e2e11ef863102cae894abaf_x5F_male"
        cx={63.9}
        cy={540.4}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg___x31_ac030ad3e2e11ef863102cae894abaf_x5F_male"
        cx={69}
        cy={540.4}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg___x32_68ff8323d6d11ef863102cae894abaf_x5F_female"
        d="M582.4 413.8c-1.4 0-2.6 1.1-2.6 2.6s1.1 2.6 2.6 2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg___x32_68ff8323d6d11ef863102cae894abaf_x5F_male"
        cx={582.4}
        cy={416.4}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg___x32_69ada803d6d11ef863102cae894abaf_x5F_female"
        d="M582.4 440.4c-1.4 0-2.6 1.1-2.6 2.6 0 1.4 1.1 2.6 2.6 2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg___x32_69ada803d6d11ef863102cae894abaf_x5F_male"
        cx={582.4}
        cy={442.9}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg___x32_6a87f553d6d11ef863102cae894abaf_x5F_female"
        d="M582.4 453.7c-1.4 0-2.6 1.1-2.6 2.6 0 1.4 1.1 2.6 2.6 2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg___x32_6a87f553d6d11ef863102cae894abaf_x5F_male"
        cx={582.4}
        cy={456.2}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg___x32_6b26c173d6d11ef863102cae894abaf_x5F_female"
        d="M582.4 400.5c-1.4 0-2.6 1.1-2.6 2.6 0 1.4 1.1 2.6 2.6 2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg___x32_6b26c173d6d11ef863102cae894abaf_x5F_male"
        cx={582.4}
        cy={403.1}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg___x32_6bd568a3d6d11ef863102cae894abaf_x5F_female"
        d="M657.7 414.5c1.4 0 2.6-1.1 2.6-2.6 0-1.4-1.1-2.6-2.6-2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg___x32_6bd568a3d6d11ef863102cae894abaf_x5F_male"
        cx={657.7}
        cy={411.9}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg___x32_6c6e6c73d6d11ef863102cae894abaf_x5F_female"
        d="M657.7 427.7c1.4 0 2.6-1.1 2.6-2.6 0-1.4-1.1-2.6-2.6-2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg___x32_6c6e6c73d6d11ef863102cae894abaf_x5F_male"
        cx={657.7}
        cy={425.2}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg___x33_efb8c5c3c9b11ef863102cae894abaf_x5F_male"
        cx={63.9}
        cy={57.6}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg___x33_f0339523c9b11ef863102cae894abaf_x5F_male"
        cx={69}
        cy={57.6}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg___x34_658a70e3e4111ef863102cae894abaf_x5F_female"
        d="M582.4 692.8c-1.4 0-2.6 1.1-2.6 2.6 0 1.4 1.1 2.6 2.6 2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg___x34_658a70e3e4111ef863102cae894abaf_x5F_male"
        cx={582.4}
        cy={695.4}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg___x34_66365933e4111ef863102cae894abaf_x5F_female"
        d="M582.4 679.5c-1.4 0-2.6 1.1-2.6 2.6 0 1.4 1.1 2.6 2.6 2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg___x34_66365933e4111ef863102cae894abaf_x5F_male"
        cx={582.4}
        cy={682.1}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg___x34_aaf380c3c9b11ef863102cae894abaf_x5F_female"
        d="M582.4 55c-1.4 0-2.6 1.1-2.6 2.6 0 1.4 1.1 2.6 2.6 2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg___x34_aaf380c3c9b11ef863102cae894abaf_x5F_male"
        cx={582.4}
        cy={57.6}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg___x34_ab5f0913c9b11ef863102cae894abaf_x5F_female"
        d="M582.4 68.3c-1.4 0-2.6 1.1-2.6 2.6 0 1.4 1.1 2.6 2.6 2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg___x34_ab5f0913c9b11ef863102cae894abaf_x5F_male"
        cx={582.4}
        cy={70.9}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg___x36_12183613e2d11ef863102cae894abaf_x5F_female"
        d="M290.1 524.5c-1.4 0-2.6 1.1-2.6 2.6 0 1.4 1.1 2.6 2.6 2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg___x36_12183613e2d11ef863102cae894abaf_x5F_male"
        cx={290.1}
        cy={527}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg___x36_12b32653e2d11ef863102cae894abaf_x5F_female"
        d="M290.1 537.8c-1.4 0-2.6 1.1-2.6 2.6 0 1.4 1.1 2.6 2.6 2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg___x36_12b32653e2d11ef863102cae894abaf_x5F_male"
        cx={290.1}
        cy={540.3}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg___x36_1341a553e2d11ef863102cae894abaf_x5F_female"
        d="M365.4 573.9c1.4 0 2.6-1.1 2.6-2.6 0-1.4-1.1-2.6-2.6-2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg___x36_1341a553e2d11ef863102cae894abaf_x5F_male"
        cx={365.4}
        cy={571.4}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg___x36_13da3ae3e2d11ef863102cae894abaf_x5F_female"
        d="M290.1 497.9c-1.4 0-2.6 1.1-2.6 2.6s1.1 2.6 2.6 2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg___x36_13da3ae3e2d11ef863102cae894abaf_x5F_male"
        cx={290.1}
        cy={500.5}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg___x36_1478a483e2d11ef863102cae894abaf_x5F_female"
        d="M365.4 507.5c1.4 0 2.6-1.1 2.6-2.6 0-1.4-1.1-2.6-2.6-2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg___x36_1478a483e2d11ef863102cae894abaf_x5F_male"
        cx={365.4}
        cy={504.9}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg___x36_15195113e2d11ef863102cae894abaf_x5F_female"
        d="M290.1 511.2c-1.4 0-2.6 1.1-2.6 2.6 0 1.4 1.1 2.6 2.6 2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg___x36_15195113e2d11ef863102cae894abaf_x5F_male"
        cx={290.1}
        cy={513.8}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg__e57757a23e2d11ef863102cae894abaf_female"
        d="M365.4 560.6c1.4 0 2.6-1.1 2.6-2.6 0-1.4-1.1-2.6-2.6-2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg__e57757a23e2d11ef863102cae894abaf_male"
        cx={365.4}
        cy={558.1}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg__e57d49003e2d11ef863102cae894abaf_female"
        d="M365.4 547.3c1.4 0 2.6-1.1 2.6-2.6 0-1.4-1.1-2.6-2.6-2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg__e57d49003e2d11ef863102cae894abaf_male"
        cx={365.4}
        cy={544.8}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg___x36_41f00bb3d6611ef863102cae894abaf_x5F_male"
        cx={63.9}
        cy={296.8}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg___x36_426398d3d6611ef863102cae894abaf_x5F_male"
        cx={69}
        cy={296.8}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg___x36_43903e33d6611ef863102cae894abaf_x5F_male"
        cx={63.9}
        cy={310.1}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg___x36_43edb663d6611ef863102cae894abaf_x5F_male"
        cx={69}
        cy={310.1}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg___x36_833bd243e2d11ef863102cae894abaf_x5F_female"
        d="M582.4 568.8c-1.4 0-2.6 1.1-2.6 2.6 0 1.4 1.1 2.6 2.6 2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg___x36_833bd243e2d11ef863102cae894abaf_x5F_male"
        cx={582.4}
        cy={571.4}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg___x36_83dcbb53e2d11ef863102cae894abaf_x5F_female"
        d="M582.4 599.8c-1.4 0-2.6 1.1-2.6 2.6s1.1 2.6 2.6 2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg___x36_83dcbb53e2d11ef863102cae894abaf_x5F_male"
        cx={582.4}
        cy={602.4}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg___x36_8512e423e2d11ef863102cae894abaf_x5F_female"
        d="M582.4 542.3c-1.4 0-2.6 1.1-2.6 2.6 0 1.4 1.1 2.6 2.6 2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg___x36_8512e423e2d11ef863102cae894abaf_x5F_male"
        cx={582.4}
        cy={544.8}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg___x36_85b94363e2d11ef863102cae894abaf_x5F_female"
        d="M582.4 586.5c-1.4 0-2.6 1.1-2.6 2.6s1.1 2.6 2.6 2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg___x36_85b94363e2d11ef863102cae894abaf_x5F_male"
        cx={582.4}
        cy={589.1}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg___x36_8652f433e2d11ef863102cae894abaf_x5F_female"
        d="M582.4 555.6c-1.4 0-2.6 1.1-2.6 2.6 0 1.4 1.1 2.6 2.6 2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg___x36_8652f433e2d11ef863102cae894abaf_x5F_male"
        cx={582.4}
        cy={558.1}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg___x36_a9876913d7011ef863102cae894abaf_x5F_male"
        cx={63.9}
        cy={442.9}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg___x36_aa0dc083d7011ef863102cae894abaf_x5F_male"
        cx={69}
        cy={442.9}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg___x36_f57c0013d6511ef863102cae894abaf_x5F_female"
        d="M582.4 307.5c-1.4 0-2.6 1.1-2.6 2.6 0 1.4 1.1 2.6 2.6 2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg___x36_f57c0013d6511ef863102cae894abaf_x5F_male"
        cx={582.4}
        cy={310.1}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg___x36_f6408a53d6511ef863102cae894abaf_x5F_female"
        d="M582.4 294.2c-1.4 0-2.6 1.1-2.6 2.6 0 1.4 1.1 2.6 2.6 2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg___x36_f6408a53d6511ef863102cae894abaf_x5F_male"
        cx={582.4}
        cy={296.8}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg___x37_cb3097c3d6911ef863102cae894abaf_x5F_female"
        d="M657.7 352.5c1.4 0 2.6-1.1 2.6-2.6 0-1.4-1.1-2.6-2.6-2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg___x37_cb3097c3d6911ef863102cae894abaf_x5F_male"
        cx={657.7}
        cy={349.9}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg___x37_cbd344f3d6911ef863102cae894abaf_x5F_female"
        d="M657.7 365.8c1.4 0 2.6-1.1 2.6-2.6 0-1.4-1.1-2.6-2.6-2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg___x37_cbd344f3d6911ef863102cae894abaf_x5F_male"
        cx={657.7}
        cy={363.2}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg___x38_07206a03ca511ef863102cae894abaf_x5F_male"
        cx={859.3}
        cy={150.6}
        r={1.4}
        className="door_circuit_svg__st31"
      />
      <circle
        id="door_circuit_svg___x38_fb284e13e4411ef863102cae894abaf_x5F_male"
        cx={63.9}
        cy={106.3}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg___x38_fb9b4243e4411ef863102cae894abaf_x5F_male"
        cx={69}
        cy={106.3}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg___x39_2c523123e4411ef863102cae894abaf_x5F_male"
        cx={63.9}
        cy={119.6}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg___x39_2cd2fca3e4411ef863102cae894abaf_x5F_male"
        cx={69}
        cy={119.6}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg___x39_4cd08a03e4411ef863102cae894abaf_x5F_male"
        cx={63.9}
        cy={132.9}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg___x39_4d3fe3f3e4411ef863102cae894abaf_x5F_male"
        cx={69}
        cy={132.9}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg___x39_ddad8e83d7011ef863102cae894abaf_x5F_male"
        cx={63.9}
        cy={456.2}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg___x39_de215be3d7011ef863102cae894abaf_x5F_male"
        cx={69}
        cy={456.2}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg__a493e8293e4111ef863102cae894abaf_male"
        cx={66.1}
        cy={682.1}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg__a49bebc23e4111ef863102cae894abaf_male"
        cx={71.2}
        cy={682.1}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg__a83d6e7b3e4111ef863102cae894abaf_male"
        cx={66.1}
        cy={695.4}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg__a8452fcb3e4111ef863102cae894abaf_male"
        cx={71.2}
        cy={695.4}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg__a9f0ebc63d6911ef863102cae894abaf_male"
        cx={925.7}
        cy={110.7}
        r={1.4}
        className="door_circuit_svg__st31"
      />
      <circle
        id="door_circuit_svg__bd123b673e3a11ef863102cae894abaf_male"
        cx={63.9}
        cy={602.4}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg__bd1a01b03e3a11ef863102cae894abaf_male"
        cx={69}
        cy={602.4}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg__bd2be0f93e3a11ef863102cae894abaf_male"
        cx={63.9}
        cy={589.1}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg__bd31b7023e3a11ef863102cae894abaf_male"
        cx={69}
        cy={589.1}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg__bf4812173ca311ef863102cae894abaf_male"
        cx={63.9}
        cy={203.8}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg__bf4e7eee3ca311ef863102cae894abaf_male"
        cx={69}
        cy={203.8}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg__bf5895503ca311ef863102cae894abaf_male"
        cx={63.9}
        cy={217}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg__bf5e6d9b3ca311ef863102cae894abaf_male"
        cx={69}
        cy={217}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg__bf6900783ca311ef863102cae894abaf_male"
        cx={63.9}
        cy={230.3}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg__bf6f97803ca311ef863102cae894abaf_male"
        cx={69}
        cy={230.3}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg__bf7a0e453ca311ef863102cae894abaf_male"
        cx={63.9}
        cy={243.6}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg__bf802f033ca311ef863102cae894abaf_male"
        cx={69}
        cy={243.6}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg__bf8bc4c43ca311ef863102cae894abaf_male"
        cx={63.9}
        cy={256.9}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg__bf9231fd3ca311ef863102cae894abaf_male"
        cx={69}
        cy={256.9}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg__c713ec4f3e4411ef863102cae894abaf_female"
        d="M582.4 117c-1.4 0-2.6 1.1-2.6 2.6 0 1.4 1.1 2.6 2.6 2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg__c713ec4f3e4411ef863102cae894abaf_male"
        cx={582.4}
        cy={119.6}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg__c71e7a203e4411ef863102cae894abaf_female"
        d="M582.4 130.3c-1.4 0-2.6 1.1-2.6 2.6s1.1 2.6 2.6 2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg__c71e7a203e4411ef863102cae894abaf_male"
        cx={582.4}
        cy={132.9}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg__c73232793e4411ef863102cae894abaf_female"
        d="M582.4 103.8c-1.4 0-2.6 1.1-2.6 2.6 0 1.4 1.1 2.6 2.6 2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg__c73232793e4411ef863102cae894abaf_male"
        cx={582.4}
        cy={106.3}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg__c73bd0833e4411ef863102cae894abaf_female"
        d="M657.7 126.6c1.4 0 2.6-1.1 2.6-2.6 0-1.4-1.1-2.6-2.6-2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg__c73bd0833e4411ef863102cae894abaf_male"
        cx={657.7}
        cy={124}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg__c74590eb3e4411ef863102cae894abaf_female"
        d="M657.7 113.3c1.4 0 2.6-1.1 2.6-2.6s-1.1-2.6-2.6-2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg__c74590eb3e4411ef863102cae894abaf_male"
        cx={657.7}
        cy={110.7}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg__dae6e3fd3e4211ef863102cae894abaf_female"
        d="M657.7 640.3c1.4 0 2.6-1.1 2.6-2.6 0-1.4-1.1-2.6-2.6-2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg__dae6e3fd3e4211ef863102cae894abaf_male"
        cx={657.7}
        cy={637.8}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg__daf1c4323e4211ef863102cae894abaf_female"
        d="M582.4 635.2c-1.4 0-2.6 1.1-2.6 2.6 0 1.4 1.1 2.6 2.6 2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg__daf1c4323e4211ef863102cae894abaf_male"
        cx={582.4}
        cy={637.8}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg__db0bf4673e4211ef863102cae894abaf_male"
        cx={63.9}
        cy={637.8}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg__db19249e3e4211ef863102cae894abaf_male"
        cx={69}
        cy={637.8}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg__db2dc3793e4211ef863102cae894abaf_male"
        cx={63.9}
        cy={651.1}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg__db33fecd3e4211ef863102cae894abaf_male"
        cx={69}
        cy={651.1}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg__e75355003d6e11ef863102cae894abaf_male"
        cx={63.9}
        cy={403.1}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg__e75a49803d6e11ef863102cae894abaf_male"
        cx={69}
        cy={403.1}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg__e765cbdd3d6e11ef863102cae894abaf_male"
        cx={63.9}
        cy={416.4}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg__e76c8d1e3d6e11ef863102cae894abaf_male"
        cx={69}
        cy={416.4}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg__f5483ab43fc511ef863102cae894abaf_male"
        cx={63.9}
        cy={150.6}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg__f54fc43e3fc511ef863102cae894abaf_male"
        cx={69}
        cy={150.6}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg__fa937d593e4311ef863102cae894abaf_male"
        cx={1127.5}
        cy={110.7}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <circle
        id="door_circuit_svg__fa9c229c3e4311ef863102cae894abaf_male"
        cx={1122.4}
        cy={110.7}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg___x34_52cc66b3ca111ef863102cae894abaf_x5F_female"
        d="M657.7 215.1c1.4 0 2.6-1.1 2.6-2.6s-1.1-2.6-2.6-2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg___x34_52cc66b3ca111ef863102cae894abaf_x5F_male"
        cx={657.7}
        cy={212.6}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg___x34_532c5de3ca111ef863102cae894abaf_x5F_female"
        d="M582.4 214.5c-1.4 0-2.6 1.1-2.6 2.6s1.1 2.6 2.6 2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg___x34_532c5de3ca111ef863102cae894abaf_x5F_male"
        cx={582.4}
        cy={217}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg__fac54e6a3ca011ef863102cae894abaf_female"
        d="M582.4 227.8c-1.4 0-2.6 1.1-2.6 2.6 0 1.4 1.1 2.6 2.6 2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg__fac54e6a3ca011ef863102cae894abaf_male"
        cx={582.4}
        cy={230.3}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg__facb26603ca011ef863102cae894abaf_female"
        d="M582.4 241.1c-1.4 0-2.6 1.1-2.6 2.6s1.1 2.6 2.6 2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg__facb26603ca011ef863102cae894abaf_male"
        cx={582.4}
        cy={243.6}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg__fad110563ca011ef863102cae894abaf_female"
        d="M582.4 254.4c-1.4 0-2.6 1.1-2.6 2.6 0 1.4 1.1 2.6 2.6 2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg__fad110563ca011ef863102cae894abaf_male"
        cx={582.4}
        cy={256.9}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path
        id="door_circuit_svg__fad704cd3ca011ef863102cae894abaf_female"
        d="M582.4 201.2c-1.4 0-2.6 1.1-2.6 2.6 0 1.4 1.1 2.6 2.6 2.6"
        className="door_circuit_svg__st30"
      />
      <circle
        id="door_circuit_svg__fad704cd3ca011ef863102cae894abaf_male"
        cx={582.4}
        cy={203.8}
        r={1.4}
        className="door_circuit_svg__st29"
      />
      <path d="M68.2 204h513.6" className="door_circuit_svg__st32" />
      <path d="M68.2 204h513.6" className="door_circuit_svg__st33" />
      <path d="M68.2 204h513.6" className="door_circuit_svg__st34" />
      <path d="M68.9 217.1h513.6" className="door_circuit_svg__st32" />
      <path
        d="M68.9 217.1h513.6M68.9 217.1h513.6"
        className="door_circuit_svg__st35"
      />
      <path d="M582.5 230.3H68.9" className="door_circuit_svg__st32" />
      <path d="M582.5 230.3H68.9" className="door_circuit_svg__st36" />
      <path d="M582.5 230.3H68.9" className="door_circuit_svg__st37" />
      <path d="M68.9 243.6h513.6" className="door_circuit_svg__st32" />
      <path d="M68.9 243.6h513.6" className="door_circuit_svg__st38" />
      <path
        d="M68.9 243.6h513.6"
        style={{
          fill: "none",
          stroke: "#ededed",
          strokeWidth: 0.4253,
          strokeMiterlimit: 11.342,
        }}
      />
      <path d="M583.6 256.9H70.1" className="door_circuit_svg__st32" />
      <path d="M583.6 256.9H70.1" className="door_circuit_svg__st40" />
      <path d="M583.6 256.9H70.1" className="door_circuit_svg__st41" />
      <path d="M582.5 403.1H68.9" className="door_circuit_svg__st32" />
      <path d="M582.5 403.1H68.9" className="door_circuit_svg__st45" />
      <path d="M582.5 403.1H68.9" className="door_circuit_svg__st41" />
      <path d="M582.4 416.6H68.8" className="door_circuit_svg__st32" />
      <path d="M582.4 416.6H68.8" className="door_circuit_svg__st36" />
      <path d="M582.4 416.6H68.8" className="door_circuit_svg__st34" />
      <path d="M68.9 443h513.6" className="door_circuit_svg__st32" />
      <path d="M68.9 443h513.6" className="door_circuit_svg__st36" />
      <path d="M68.9 443h513.6" className="door_circuit_svg__st42" />
      <path d="M69.3 456.2h513.6" className="door_circuit_svg__st32" />
      <path d="M69.3 456.2h513.6" className="door_circuit_svg__st43" />
      <path
        d="M69.3 456.2h513.6"
        style={{
          fill: "none",
          stroke: "#c1d5d9",
          strokeWidth: 0.4253,
          strokeMiterlimit: 11.342,
        }}
      />
      <path d="M69.1 500.2h221.2" className="door_circuit_svg__st32" />
      <path
        d="M69.1 500.2h221.2M69.1 500.2h221.2"
        className="door_circuit_svg__st38"
      />
      <path d="m69.1 513.8 221.2-.1" className="door_circuit_svg__st32" />
      <path
        d="m69.1 513.8 221.2-.1M69.1 513.8l221.2-.1"
        className="door_circuit_svg__st47"
      />
      <path d="M69.1 526.8h221.2" className="door_circuit_svg__st32" />
      <path
        d="M69.1 526.8h221.2M69.1 526.8h221.2"
        className="door_circuit_svg__st40"
      />
      <path d="M68.2 540.4h221.2" className="door_circuit_svg__st32" />
      <path d="M68.2 540.4h221.2" className="door_circuit_svg__st47" />
      <path d="M68.2 540.4h221.2" className="door_circuit_svg__st48" />
      <path d="m365.4 544.8 217.1.1" className="door_circuit_svg__st32" />
      <path
        d="m365.4 544.8 217.1.1M365.4 544.8l217.1.1"
        className="door_circuit_svg__st38"
      />
      <path d="m365.4 558.1 217.1.1" className="door_circuit_svg__st32" />
      <path
        d="m365.4 558.1 217.1.1M365.4 558.1l217.1.1"
        className="door_circuit_svg__st47"
      />
      <path d="M365.4 571.4h217.1" className="door_circuit_svg__st32" />
      <path
        d="M365.4 571.4h217.1M365.4 571.4h217.1"
        className="door_circuit_svg__st40"
      />
      <path d="M582.4 589.1H68.8" className="door_circuit_svg__st32" />
      <path
        d="M582.4 589.1H68.8M582.4 589.1H68.8"
        className="door_circuit_svg__st36"
      />
      <path d="M582.4 602.4H68.8" className="door_circuit_svg__st32" />
      <path
        d="M582.4 602.4H68.8M582.4 602.4H68.8"
        className="door_circuit_svg__st35"
      />
      <path d="M68.8 637.8h513.6" className="door_circuit_svg__st32" />
      <path d="M68.8 637.8h513.6" className="door_circuit_svg__st38" />
      <path d="M68.8 637.8h513.6" className="door_circuit_svg__st34" />
      <path d="M71 682.1h511.4" className="door_circuit_svg__st32" />
      <path d="M71 682.1h511.4" className="door_circuit_svg__st47" />
      <path d="M71 682.1h511.4" className="door_circuit_svg__st48" />
      <path d="M71 695.4h511.4" className="door_circuit_svg__st32" />
      <path d="M71 695.4h511.4" className="door_circuit_svg__st45" />
      <path d="M71 695.4h511.4" className="door_circuit_svg__st37" />
      <path
        id="door_circuit_svg__X11_C60_2_00000106867578655465979280000002933495565568111762_"
        d="M68.2 296.5h50.6l8.8 13.3h398.6l8.8-13.3h46.5"
        style={{
          fill: "none",
          stroke: "#838dc6",
          strokeWidth: 1.7008,
          strokeMiterlimit: 11.3386,
        }}
      />
      <path
        d="M68.2 310.1h50.6l8.8-13.3h398.6l8.8 13.3h46.5"
        className="door_circuit_svg__st9"
      />
      <path
        id="door_circuit_svg__X11_C60_1_00000044144433595512682090000013533025206066807680_"
        d="M68.2 310.1h50.6l8.8-13.3h398.6l8.8 13.3h46.5"
        style={{
          fill: "none",
          stroke: "#ad00ff",
          strokeWidth: 1.7008,
          strokeMiterlimit: 11.3386,
        }}
      />
    </svg>
  );
});

export default SvgDoorCircuit2;