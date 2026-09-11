/* Marca do SINTFUB: grupo de trabalhadores com o braço erguido sobre a
   faixa "SINTFUB". Vetor próprio (reconstrução fiel à arte de referência
   fornecida), escala sem perda em qualquer tamanho. */

function Marcher() {
  return (
    <g>
      <circle cx="0" cy="0" r="11" />
      <rect x="-13" y="9" width="26" height="34" rx="9" />
      <g transform="translate(-9,15) rotate(-38)">
        <rect x="-5.5" y="-41" width="11" height="43" rx="5.5" />
        <circle cx="0" cy="-41" r="7.5" />
      </g>
      <g transform="translate(10,16) rotate(18)">
        <rect x="-5.5" y="0" width="11" height="29" rx="5.5" />
      </g>
    </g>
  );
}

function Trousers({ flip = false }: { flip?: boolean }) {
  return (
    <g transform={flip ? "scale(-1,1)" : undefined}>
      <Marcher />
      <g transform="translate(-8,43) rotate(-11)">
        <rect x="-6.5" y="0" width="13" height="47" rx="6" />
      </g>
      <g transform="translate(8,43) rotate(11)">
        <rect x="-6.5" y="0" width="13" height="47" rx="6" />
      </g>
    </g>
  );
}

function Skirt({ flip = false }: { flip?: boolean }) {
  return (
    <g transform={flip ? "scale(-1,1)" : undefined}>
      <Marcher />
      <polygon points="-13,43 13,43 22,84 -22,84" />
      <g transform="translate(-10,84) rotate(-7)">
        <rect x="-5.5" y="0" width="11" height="15" rx="5" />
      </g>
      <g transform="translate(10,84) rotate(7)">
        <rect x="-5.5" y="0" width="11" height="15" rx="5" />
      </g>
    </g>
  );
}

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 380 248" className={className} role="img" aria-label="SINTFUB">
      <g fill="#C41230">
        <g transform="translate(62,66)">
          <Trousers />
        </g>
        <g transform="translate(147,66)">
          <Skirt flip />
        </g>
        <g transform="translate(232,66)">
          <Trousers flip />
        </g>
        <g transform="translate(317,66)">
          <Skirt />
        </g>
        <rect x="8" y="176" width="364" height="50" rx="8" />
      </g>
      <text
        x="190"
        y="210"
        textAnchor="middle"
        fill="#fff"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="800"
        fontSize="34"
        letterSpacing="0.5"
      >
        SINTFUB
      </text>
    </svg>
  );
}
