// ==UserScript==
// @name         Pokelife QoL
// @namespace    npm/vite-plugin-monkey
// @version      1.5.0
// @author       Damian Gesicki
// @description  Custom quality of life improvements for Pokelife game.
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pokelife.pl
// @homepageURL  https://github.com/Damian764/PokelifeQoL
// @supportURL   https://github.com/Damian764/PokelifeQoL/issues
// @downloadURL  https://github.com/Damian764/PokelifeQoL/raw/refs/heads/main/pokelife-qol.user.js
// @updateURL    https://github.com/Damian764/PokelifeQoL/raw/refs/heads/main/pokelife-qol.user.js
// @match        https://gra.pokelife.pl/*
// @require      https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js
// @require      https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js
// @tag          QoL
// @grant        GM_addStyle
// ==/UserScript==

(o=>{if(typeof GM_addStyle=="function"){GM_addStyle(o);return}const t=document.createElement("style");t.textContent=o,document.head.append(t)})(" .pokelife-QoL-pokemon-details{font-size:1.2rem;font-weight:700;text-wrap:balance}.pokelife-QoL-pokemon-btn>button{height:100%;display:grid;grid-template-rows:auto auto 20px 20px}.pokelife-QoL-enhanced-display{display:flex;flex-wrap:wrap;justify-content:space-around}:not(.shopItem)>[aria-label*=balle] div{width:100%;border-bottom:1px solid #595959;background:#404040;border-radius:4px 4px 0 0}.pokelife-QoL-btn-sort{margin-top:5px}.pokelife-QoL-btn-sort>b{display:none}[sort-direction=asc] .pokelife-QoL-btn-sort.active .asc-ico,[sort-direction=desc] .pokelife-QoL-btn-sort.active .desc-ico{display:inline}.row[data-toggle=buttons]{display:flex;flex-wrap:wrap}.btn-hodowla b{display:block;border-bottom:1px solid}#shoutbox .panel .tab{display:none!important}#shoutbox .panel .activeTab{display:block!important} ");

(function (React, require$$0) {
  'use strict';

  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  var jsxRuntime = { exports: {} };
  var reactJsxRuntime_production_min = {};
  /**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var hasRequiredReactJsxRuntime_production_min;
  function requireReactJsxRuntime_production_min() {
    if (hasRequiredReactJsxRuntime_production_min) return reactJsxRuntime_production_min;
    hasRequiredReactJsxRuntime_production_min = 1;
    var f = React, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
    function q(c, a, g) {
      var b, d = {}, e = null, h = null;
      void 0 !== g && (e = "" + g);
      void 0 !== a.key && (e = "" + a.key);
      void 0 !== a.ref && (h = a.ref);
      for (b in a) m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
      if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
      return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
    }
    reactJsxRuntime_production_min.Fragment = l;
    reactJsxRuntime_production_min.jsx = q;
    reactJsxRuntime_production_min.jsxs = q;
    return reactJsxRuntime_production_min;
  }
  var hasRequiredJsxRuntime;
  function requireJsxRuntime() {
    if (hasRequiredJsxRuntime) return jsxRuntime.exports;
    hasRequiredJsxRuntime = 1;
    {
      jsxRuntime.exports = requireReactJsxRuntime_production_min();
    }
    return jsxRuntime.exports;
  }
  var jsxRuntimeExports = requireJsxRuntime();
  var client = {};
  var hasRequiredClient;
  function requireClient() {
    if (hasRequiredClient) return client;
    hasRequiredClient = 1;
    var m = require$$0;
    {
      client.createRoot = m.createRoot;
      client.hydrateRoot = m.hydrateRoot;
    }
    return client;
  }
  var clientExports = requireClient();
  const ReactDOM = /* @__PURE__ */ getDefaultExportFromCjs(clientExports);
  const CLASSNAMES = {
    default: "pokelife-QoL"
  };
  const SELECTORS = {
    mainElement: "#glowne_okno",
    pokemonSelectionTitle: "#glowne_okno center",
    pokemonMarketTitle: "#glowne_okno .panel-heading",
    pokemonButtonContainer: ".panel-body .btn-wybor_pokemona",
    pokemonMarketContainer: '#glowne_okno form[action*="sprzedaj&zaznaczone"]',
    pokemonMarket: '#glowne_okno form[action*="sprzedaj&zaznaczone"] .panel-body div[data-toggle="buttons"]',
    totalPriceElement: "div.text-center",
    sortButtonWrapper: '#glowne_okno form[action*="sprzedaj&zaznaczone"] .panel-body .row'
  };
  const isPokemonSelectionScreen = () => {
    const titleNode = document.querySelector(SELECTORS.pokemonSelectionTitle);
    return (titleNode == null ? void 0 : titleNode.innerText.toLowerCase().includes("wybierz pokemona")) || false;
  };
  const isPokemonMarketScreen = () => {
    const titleNode = document.querySelector(SELECTORS.pokemonMarketTitle);
    return (titleNode == null ? void 0 : titleNode.innerText.toLowerCase().includes("hodowla")) || false;
  };
  const fetchPokemonDetails = (id) => {
    try {
      const sidebarElement = document.querySelector(".stan-pokemon");
      if (!sidebarElement) {
        throw new Error("Sidebar element not found");
      }
      const sidebar = sidebarElement.closest("tbody");
      if (!sidebar) {
        throw new Error("Sidebar closest tbody not found");
      }
      const pokemonElement = sidebar.querySelector(`tr:nth-child(${id + 1}) > td:nth-child(2)`);
      if (!pokemonElement) {
        throw new Error("Pokemon element not found");
      }
      const pokemonNameElement = pokemonElement.querySelector("b");
      if (!pokemonNameElement) {
        throw new Error("Pokemon name element not found");
      }
      const pokemonName = pokemonNameElement.innerText;
      const [pokemonHP, pokemonEXP] = [...pokemonElement.querySelectorAll(".progress")];
      return { pokemonName, pokemonHP, pokemonEXP };
    } catch (error) {
      console.error("Error fetching Pokémon details:", error);
      return {};
    }
  };
  const fetchBattleReadyPokemon = () => {
    try {
      const btnElement = document.querySelector("#glowne_okno .panel-body .btn-wybor_pokemona");
      if (!btnElement) {
        throw new Error("Button element not found");
      }
      const closestDiv = btnElement.closest("div[style='row']");
      if (!closestDiv) {
        throw new Error("Closest div not found");
      }
      return closestDiv.querySelectorAll(":scope > div");
    } catch (error) {
      console.error("Error fetching battle-ready Pokémon:", error);
      return [];
    }
  };
  const fetchPokemonCost = (element) => {
    try {
      const textContent = element.textContent;
      if (!textContent) throw new Error("Element text content is null");
      const costString = textContent.split(" ")[1].split("	").pop();
      return parseInt(costString || "0");
    } catch (error) {
      throw new Error(`Error fetching Pokémon cost: ${error}`);
    }
  };
  const fetchPokemonName = (element) => {
    try {
      const nameElement = element.querySelector("b");
      if (!nameElement) throw new Error("Name element not found");
      return nameElement.textContent || "";
    } catch (error) {
      throw new Error(`Error fetching Pokémon name: ${error}`);
    }
  };
  const fetchPokemonLevel = (element) => {
    try {
      const textContent = element.textContent;
      if (!textContent) throw new Error("Element text content is null");
      return parseInt(textContent.split(" ")[1].split("poz")[0]);
    } catch (error) {
      throw new Error(`Error fetching Pokémon level: ${error}`);
    }
  };
  const removeElements = (removable) => {
    if (!removable) return;
    const elements = "length" in removable ? Array.from(removable) : [removable];
    elements.forEach((element) => element.remove());
  };
  const addQoLClass = (element, className) => {
    element.classList.add(`${CLASSNAMES.default}-${className}`);
  };
  const setPokemonElementClass = (mainElement) => {
    const pokemonButtonContainer = mainElement.querySelector(SELECTORS.pokemonButtonContainer);
    if (!pokemonButtonContainer) throw new Error("Pokemon button container not found");
    const closestDiv = pokemonButtonContainer.closest("div[style='row']");
    if (!closestDiv) throw new Error("Closest div not found");
    addQoLClass(closestDiv, "enhanced-display");
  };
  const PokemonName = ({ pokemonName }) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `${CLASSNAMES.default}-pokemon-details`, children: pokemonName });
  };
  const improveSelectionUI = (availablePokemon) => {
    availablePokemon.forEach((pokemonElement, index) => {
      addQoLClass(pokemonElement, "pokemon-btn");
      const { pokemonName, pokemonHP, pokemonEXP } = fetchPokemonDetails(index);
      const pokemonButton = pokemonElement.querySelector("button");
      if (!pokemonButton) throw new Error("Pokemon button not found");
      const pokemonNameContaioner = document.createElement("div");
      const root = clientExports.createRoot(pokemonNameContaioner);
      root.render(React.createElement(PokemonName, { pokemonName: pokemonName || "" }, "help"));
      pokemonButton.prepend(pokemonNameContaioner);
      pokemonButton.append(pokemonHP, pokemonEXP);
    });
  };
  const selectionEnhancments = () => {
    const mainElement = document.querySelector(SELECTORS.mainElement);
    const availablePokemon = [...fetchBattleReadyPokemon()];
    setPokemonElementClass(mainElement);
    improveSelectionUI(availablePokemon);
  };
  const SelectionPage = () => {
    if (!isPokemonSelectionScreen()) return;
    selectionEnhancments();
  };
  const sortPokemonBy = (sortBy) => {
    const wrapper = document.querySelector(SELECTORS.pokemonMarketContainer);
    if (!wrapper) {
      console.error("Pokemon market container not found");
      return;
    }
    const pokemonContainer = wrapper.querySelector('div[data-toggle="buttons"]');
    const pokemonElements = Array.from(wrapper.querySelectorAll("label"));
    const currentSortBy = wrapper.getAttribute("sort-by");
    const sortDirection = currentSortBy === sortBy ? wrapper.getAttribute("sort-direction") === "desc" ? "asc" : "desc" : "desc";
    switch (sortBy) {
      case "value":
        pokemonElements.sort((a, b) => {
          const costA = fetchPokemonCost(a);
          const costB = fetchPokemonCost(b);
          const diff = costA - costB;
          if (diff === 0) {
            return parseInt(a.getAttribute("data-original-index") || "0") - parseInt(b.getAttribute("data-original-index") || "0");
          }
          return sortDirection === "asc" ? diff : -diff;
        });
        break;
      case "name":
        pokemonElements.sort((a, b) => {
          const nameA = fetchPokemonName(a);
          const nameB = fetchPokemonName(b);
          const diff = nameA.localeCompare(nameB);
          if (diff === 0) {
            return parseInt(a.getAttribute("data-original-index") || "0") - parseInt(b.getAttribute("data-original-index") || "0");
          }
          return sortDirection === "asc" ? diff : -diff;
        });
        break;
      case "level":
        pokemonElements.sort((a, b) => {
          const levelA = fetchPokemonLevel(a);
          const levelB = fetchPokemonLevel(b);
          const diff = levelA - levelB;
          if (diff === 0) {
            return parseInt(a.getAttribute("data-original-index") || "0") - parseInt(b.getAttribute("data-original-index") || "0");
          }
          return sortDirection === "asc" ? diff : -diff;
        });
        break;
      case "date":
      default:
        pokemonElements.sort((a, b) => {
          return sortDirection === "asc" ? parseInt(a.getAttribute("data-original-index") || "0") - parseInt(b.getAttribute("data-original-index") || "0") : parseInt(b.getAttribute("data-original-index") || "0") - parseInt(a.getAttribute("data-original-index") || "0");
        });
        break;
    }
    wrapper.setAttribute("sort-direction", sortDirection);
    wrapper.setAttribute("sort-by", sortBy);
    const fragment = document.createDocumentFragment();
    pokemonElements.forEach((pokemon) => fragment.appendChild(pokemon.cloneNode(true)));
    removeElements(pokemonElements);
    if (pokemonContainer) {
      pokemonContainer.appendChild(fragment);
    } else {
      console.error("Pokemon container not found");
    }
  };
  const Icon = ({ text, classes }) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: classes, children: text });
  };
  const handleClick = (sortBy) => (event) => {
    var _a;
    event.preventDefault();
    (_a = document.querySelector(`.${CLASSNAMES.default}-btn-sort.active`)) == null ? void 0 : _a.classList.remove("active");
    event.currentTarget.classList.add("active");
    sortPokemonBy(sortBy);
  };
  const SortButton = ({ label, sortBy }) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: `btn btn-success col-xs-12 col-sm-6 ${CLASSNAMES.default}-btn-sort`, onClick: handleClick(sortBy), children: [
      label,
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { text: "↑", classes: "asc-ico" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { text: "↓", classes: "desc-ico" })
    ] });
  };
  const displayTotalPrice = () => {
    const pokemonMarket = document.querySelector(SELECTORS.pokemonMarket);
    const pokemonTotalPriceElement = pokemonMarket == null ? void 0 : pokemonMarket.querySelector(SELECTORS.totalPriceElement);
    if (pokemonMarket && pokemonTotalPriceElement) {
      pokemonMarket.prepend(pokemonTotalPriceElement);
    }
  };
  const addIndexToPokemon = () => {
    const wrapper = document.querySelector(SELECTORS.pokemonMarketContainer);
    if (wrapper) {
      const pokemonElements = Array.from(wrapper.querySelectorAll("label"));
      pokemonElements.forEach((elem, index) => {
        if (!elem.hasAttribute("data-original-index")) {
          elem.setAttribute("data-original-index", index.toString());
        }
      });
    }
  };
  const insertSortButtons = () => {
    const wrapper = document.querySelector(SELECTORS.sortButtonWrapper);
    if (!wrapper) return;
    const config = [
      { label: "Sortuj po dacie", sortBy: "date" },
      { label: "Sortuj po wartości", sortBy: "value" },
      { label: "Sortuj po nazwie", sortBy: "name" },
      { label: "Sortuj po poziomie", sortBy: "level" }
    ];
    config.forEach(({ label, sortBy }) => {
      const buttonContainer = document.createElement("div");
      const root = clientExports.createRoot(buttonContainer);
      root.render(React.createElement(SortButton, { label, sortBy }));
      wrapper.appendChild(buttonContainer);
    });
  };
  const MarketPage = () => {
    if (!isPokemonMarketScreen()) return;
    addIndexToPokemon();
    displayTotalPrice();
    insertSortButtons();
  };
  const initialize = () => {
    SelectionPage();
    MarketPage();
  };
  const DomManipulator = () => {
    React.useEffect(() => {
      const mainElement = document.querySelector("#glowne_okno");
      if (!mainElement) return;
      initialize();
      const config = { childList: true, subtree: false, attributes: false };
      const observer = new MutationObserver(initialize);
      observer.observe(mainElement, config);
    }, []);
    return null;
  };
  ReactDOM.createRoot(
    (() => {
      const app = document.createElement("div");
      document.body.append(app);
      return app;
    })()
  ).render(
    /* @__PURE__ */ jsxRuntimeExports.jsx(DomManipulator, {})
  );

})(React, ReactDOM);