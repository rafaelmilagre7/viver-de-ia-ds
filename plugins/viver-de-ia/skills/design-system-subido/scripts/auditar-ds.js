/**
 * Auditoria do DS SUBIDO · roda DENTRO da página (console do navegador,
 * javascript_tool do agente ou page.evaluate do Playwright).
 *
 *   const r = await (async () => { <conteúdo deste arquivo> })();
 *
 * Mede a tela aberta e compara com a referência (o My Dashboard na variação
 * Flat SUBIDO · Revenue++, medido em 28/10/2026). Devolve:
 *   { rota, medidas, desvios: [{ regra, grave, achado, esperado, onde }] }
 *
 * "grave" = quebra o DS de forma visível (a tela parece de outro sistema).
 * Não substitui o olho: a parte de montagem da tela (Revenue-Centric) tem
 * checagens heurísticas aqui e o resto está no checklist do SKILL.md.
 */
(() => {
  const REF = {
    canvas: "rgb(247, 248, 250)", // --via-gray-50
    navy: "rgb(10, 31, 59)",
    h1Px: [30, 36], // 3xl–4xl
    h1Peso: 500,
    paddingConteudoMin: 32, // px · referência 40
    larguraMaxConteudo: 1280, // px · referência 1152
    fonteMinimaPx: 13, // conteúdo; eyebrow/selo em caps podem ter 11
    tamanhosDeFonteMax: 7, // distintos na tela (referência: 6)
    alturaItemMenuMin: 36, // px · referência 40
    paddingCardMin: 20, // px · referência 24–32
    botaoFontePx: 13,
    botaoAltura: [32, 44],
  };

  const desvios = [];
  const add = (regra, grave, achado, esperado, onde) =>
    desvios.push({ regra, grave, achado, esperado, onde });

  const vis = (el) => {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none" && s.opacity !== "0";
  };
  const rgb = (c) => {
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const [r, g, b, a = "1"] = m[1].split(",").map((x) => x.trim());
    return { r: +r, g: +g, b: +b, a: +a };
  };
  const desc = (el) => {
    const t = (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40);
    return `${el.tagName.toLowerCase()}${t ? ` "${t}"` : ""}`;
  };
  const navyBg = (s) => {
    const bg = s.backgroundColor;
    const c = rgb(bg);
    const grad = s.backgroundImage.includes("10, 31, 59") || s.backgroundImage.includes("2, 22, 42");
    return grad || (c && c.a > 0.9 && c.r < 40 && c.g < 60 && c.b < 90);
  };

  const main = document.querySelector("main") || document.body;
  const medidas = { rota: location.pathname };

  // ── 1. Moldura ───────────────────────────────────────────────
  const fundos = [document.body, main, main.parentElement].map((e) => e && getComputedStyle(e).backgroundColor);
  const canvas = fundos.find((c) => c && rgb(c) && rgb(c).a > 0) || fundos[0];
  medidas.canvas = canvas;
  if (canvas !== REF.canvas)
    add("moldura.canvas", true, canvas, `${REF.canvas} (--via-gray-50)`, "fundo da área de conteúdo");

  // barra de topo acima do conteúdo (o DS não tem: título é o topo da tela)
  const topo = [...document.querySelectorAll("header")].find((h) => {
    const r = h.getBoundingClientRect();
    return vis(h) && r.top < 10 && r.height >= 40 && r.width > 400 && !h.closest("aside");
  });
  if (topo) add("moldura.barra-topo", true, `header de ${Math.round(topo.getBoundingClientRect().height)}px`, "sem barra de topo (o cabeçalho da página é o topo)", desc(topo));

  // container do conteúdo: padding e largura máxima
  const h1 = [...main.querySelectorAll("h1")].find(vis);
  let cont = h1 ? h1.parentElement : main.firstElementChild;
  let pad = 0, maxW = null;
  for (let e = cont; e && e !== document.body; e = e.parentElement) {
    const s = getComputedStyle(e);
    pad = Math.max(pad, parseFloat(s.paddingLeft));
    if (s.maxWidth !== "none") maxW = Math.min(maxW ?? Infinity, parseFloat(s.maxWidth));
  }
  medidas.paddingConteudo = pad;
  medidas.larguraMaxConteudo = maxW;
  if (pad < REF.paddingConteudoMin) add("moldura.respiro", true, `${pad}px`, "≥ 32px (referência 40px)", "padding do container do conteúdo");
  if (!maxW || maxW > REF.larguraMaxConteudo) add("moldura.largura-max", false, maxW ? `${maxW}px` : "sem limite", "≤ 1280px (referência 1152px)", "max-width do conteúdo");

  // ── 2. Cabeçalho da página ───────────────────────────────────
  if (!h1) add("cabecalho.h1", true, "sem h1 visível", "1 h1 por tela", "main");
  else {
    const s = getComputedStyle(h1);
    medidas.h1 = `${s.fontSize} w${s.fontWeight} ${s.color}`;
    const px = parseFloat(s.fontSize);
    if (px < REF.h1Px[0] || px > REF.h1Px[1]) add("cabecalho.h1-tamanho", false, s.fontSize, "30–36px", desc(h1));
    if (+s.fontWeight !== REF.h1Peso) add("cabecalho.h1-peso", false, s.fontWeight, "500", desc(h1));
    if (s.color !== REF.navy) add("cabecalho.h1-cor", false, s.color, REF.navy, desc(h1));
    // eyebrow: texto curto em caps logo acima do h1
    const antes = [...main.querySelectorAll("p,span,div")].filter((e) => {
      if (!vis(e) || e.children.length) return false;
      const r = e.getBoundingClientRect(), rh = h1.getBoundingClientRect();
      return r.bottom <= rh.top + 2 && rh.top - r.bottom < 24 && getComputedStyle(e).textTransform === "uppercase";
    });
    // exceção: hero centralizado da home sem dado (promessa + instrução, sem eyebrow)
    const hero = s.textAlign === "center";
    if (!antes.length && !hero) add("cabecalho.eyebrow", true, "sem eyebrow", "rótulo em caps 11px acima do título (grupo da tela)", desc(h1));
    // ícone colado no título
    const linha = h1.parentElement;
    if (linha && [...linha.children].some((c) => c !== h1 && c.tagName.toLowerCase() === "svg"))
      add("cabecalho.icone-no-titulo", true, "ícone ao lado do h1", "título sem ícone (o ícone já está na sidebar)", desc(h1));
  }
  const h1s = [...main.querySelectorAll("h1")].filter(vis);
  if (h1s.length > 1) add("cabecalho.um-h1", false, `${h1s.length} h1`, "1 h1", "main");

  // ── 3. Tipografia ───────────────────────────────────────────
  const tamanhos = {};
  const pequenos = [];
  main.querySelectorAll("*").forEach((e) => {
    if (!vis(e) || e.children.length || !(e.textContent || "").trim()) return;
    const s = getComputedStyle(e);
    const px = parseFloat(s.fontSize);
    tamanhos[px] = (tamanhos[px] || 0) + 1;
    const caps = s.textTransform === "uppercase";
    const selo = e.closest('[class*="badge"],[class*="pill"],[data-slot="badge"],kbd,[role="status"]');
    // chip (botão pill com borda, não navy) pode ter 11px: é opção, não ação
    const chip = e.closest("button") && parseFloat(getComputedStyle(e.closest("button")).borderTopLeftRadius) >= 999 && !navyBg(getComputedStyle(e.closest("button")));
    // miniatura decorativa (prévia de template/gráfico) não é texto de leitura
    const decorativo = e.closest('[aria-hidden="true"]') || px < 10;
    if (px < REF.fonteMinimaPx && !caps && !selo && !chip && !decorativo) pequenos.push(`${px}px ${desc(e)}`);
  });
  medidas.tamanhosDeFonte = tamanhos;
  if (Object.keys(tamanhos).length > REF.tamanhosDeFonteMax)
    add("tipo.escala", false, `${Object.keys(tamanhos).length} tamanhos (${Object.keys(tamanhos).join(", ")})`, `≤ ${REF.tamanhosDeFonteMax}`, "main");
  if (pequenos.length) add("tipo.minimo", false, `${pequenos.length} textos < 13px`, "≥ 13px no conteúdo (11px só eyebrow/selo em caps)", pequenos.slice(0, 5).join(" · "));
  const fam = getComputedStyle(document.body).fontFamily.split(",")[0].replace(/['"]/g, "");
  medidas.fonte = fam;
  if (fam !== "Geist") add("tipo.familia", true, fam, "Geist", "body");

  // ── 4. Bordas e superfícies ─────────────────────────────────
  const bordasDuras = new Map();
  document.querySelectorAll("main *, aside *, nav *, [data-sidebar] *").forEach((e) => {
    if (!vis(e)) return;
    const s = getComputedStyle(e);
    for (const lado of ["Top", "Right", "Bottom", "Left"]) {
      if (parseFloat(s[`border${lado}Width`]) < 1 || s[`border${lado}Style`] === "none") continue;
      const c = rgb(s[`border${lado}Color`]);
      if (!c) continue;
      // cinza opaco médio (ex.: #D1D1D1, #D0D5DD) = borda "dura"; o DS usa navy translúcido
      const opacoCinza = c.a > 0.9 && c.r > 180 && c.r < 225 && Math.abs(c.r - c.b) < 25;
      if (opacoCinza) bordasDuras.set(s[`border${lado}Color`], (bordasDuras.get(s[`border${lado}Color`]) || 0) + 1);
    }
  });
  if (bordasDuras.size)
    add("superficie.borda", true, [...bordasDuras].map(([c, n]) => `${c} ×${n}`).join(", "), "rgba(10,31,59,.05) em card/moldura · rgba(10,31,59,.16) em controle", "bordas de cards, sidebar e campos");

  const cards = [...main.querySelectorAll("div,section,article,li,a")].filter((e) => {
    if (!vis(e)) return false;
    const s = getComputedStyle(e);
    const r = e.getBoundingClientRect();
    // card de conteúdo (aviso/banner de uma linha tem respiro compacto de propósito)
    return parseFloat(s.borderTopLeftRadius) >= 16 && parseFloat(s.borderTopWidth) >= 1 && r.width > 160 && r.height > 110;
  });
  const apertados = cards.filter((c) => {
    const s = getComputedStyle(c);
    // card que é só moldura de outro card (padding 0) não conta
    return parseFloat(s.paddingTop) > 0 && parseFloat(s.paddingTop) < REF.paddingCardMin;
  });
  const comSombra = cards.filter((c) => {
    const sh = getComputedStyle(c).boxShadow;
    return sh !== "none" && !/inset/.test(sh) && /\d+px \d+px/.test(sh) && !navyBg(getComputedStyle(c));
  });
  medidas.cards = cards.length;
  if (apertados.length) add("superficie.respiro-card", false, `${apertados.length} cards com padding < 20px`, "24–32px", apertados.slice(0, 3).map(desc).join(" · "));
  if (comSombra.length) add("superficie.sombra", false, `${comSombra.length} cards com sombra`, "card plano: hairline e nenhuma sombra", comSombra.slice(0, 3).map(desc).join(" · "));

  // ── 5. Ações ────────────────────────────────────────────────
  const botoes = [...main.querySelectorAll("button, a[role=button], a[class*=btn]")].filter(vis);
  const primarios = botoes.filter((b) => navyBg(getComputedStyle(b)) && (b.textContent || "").trim().length > 1);
  medidas.botoesPrimarios = primarios.map((b) => (b.textContent || "").trim().slice(0, 30));
  if (primarios.length > 1)
    add("acao.uma-dominante", true, `${primarios.length} botões navy: ${medidas.botoesPrimarios.join(" | ")}`, "1 ação dominante por tela; as demais em texto/outline", "main");
  const fora = botoes.filter((b) => {
    const s = getComputedStyle(b);
    const px = parseFloat(s.fontSize);
    const h = b.getBoundingClientRect().height;
    return navyBg(s) && (Math.abs(px - REF.botaoFontePx) > 1 || h < REF.botaoAltura[0] || h > REF.botaoAltura[1]);
  });
  if (fora.length) add("acao.botao-medidas", false, fora.slice(0, 3).map((b) => `${getComputedStyle(b).fontSize} h${Math.round(b.getBoundingClientRect().height)}`).join(", "), "13px · 500 · altura 36 (32–44) · pill", fora.slice(0, 3).map(desc).join(" · "));
  const quadrados = primarios.filter((b) => parseFloat(getComputedStyle(b).borderTopLeftRadius) < 16);
  if (quadrados.length) add("acao.botao-pill", false, `${quadrados.length} botões sem raio pill`, "radius 999", quadrados.slice(0, 3).map(desc).join(" · "));

  // ── 6. Navegação ────────────────────────────────────────────
  const itens = [...document.querySelectorAll('aside a, nav a, [data-sidebar="menu-button"]')].filter(vis);
  if (itens.length) {
    const alturas = itens.map((i) => Math.round(i.getBoundingClientRect().height));
    const min = Math.min(...alturas);
    medidas.alturaItemMenu = min;
    if (min < REF.alturaItemMenuMin) add("nav.altura-item", false, `${min}px`, "≥ 36px (referência 40px)", "itens da sidebar");
    const sb = itens[0].closest("aside, nav, [data-sidebar=sidebar]");
    if (sb) {
      const bg = getComputedStyle(sb).backgroundColor;
      const c = rgb(bg);
      if (c && c.a > 0.5 && c.r < 60) add("nav.sidebar-clara", true, bg, "sidebar branca; navy só no item ativo", "sidebar");
    }
  }

  // ── 7. Montagem da tela (Revenue-Centric, heurísticas) ──────
  const zeros = [...main.querySelectorAll("*")].filter((e) => {
    if (!vis(e) || e.children.length) return false;
    const px = parseFloat(getComputedStyle(e).fontSize);
    return px >= 24 && /^(R\$\s*)?0([,.]0+)?%?$/.test((e.textContent || "").trim());
  });
  if (zeros.length >= 2) add("revenue.painel-em-branco", true, `${zeros.length} números zerados em destaque`, "sem dado, a tela mostra o próximo passo — não KPIs zerados (never ship a blank dashboard)", zeros.slice(0, 4).map(desc).join(" · "));

  const avisos = [...main.querySelectorAll("*")].filter((e) => vis(e) && /n(ã|a)o (h(á|a)|tem) dados|ainda n(ã|a)o (conectou|h(á|a))|nenhum[a]? .* ainda/i.test((e.textContent || "").trim()) && e.children.length === 0);
  if (avisos.length >= 2) add("revenue.aviso-duplicado", true, `${avisos.length} avisos de "sem dados"`, "1 aviso/próximo passo por tela", avisos.slice(0, 3).map(desc).join(" · "));

  return { rota: location.pathname, medidas, desvios, total: desvios.length, graves: desvios.filter((d) => d.grave).length };
})();
