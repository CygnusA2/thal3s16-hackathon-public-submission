'use strict';

(() => {
  const clientProfiles = {
    los: {name:'Property-rich entrepreneur', net:16.8, property:8, other:12, debt:2, otherDebt:1.2, request:1.5},
    santa: {name:'Technology founder', net:22, property:6, other:18, debt:1, otherDebt:1, request:1},
    orange: {name:'Real-estate investor', net:16.2, property:10, other:11, debt:4, otherDebt:0.8, request:1.25}
  };
  const clientProfileForProperty = {
    'beverly-hills':'los',
    'malibu':'los',
    'palo-alto':'santa',
    'montecito':'orange',
    'la-jolla':'orange'
  };

  const assetProfiles = {
    los: {cash:2, equities:3, bonds:1, privateBusiness:5, alternatives:1, properties:[['Primary residence',5,1.2],['Investment property',3,0.8]]},
    santa: {cash:3, equities:8, bonds:2, privateBusiness:4, alternatives:1, properties:[['Primary residence',4,0.7],['Rental residence',2,0.3]]},
    orange: {cash:1.2, equities:2, bonds:1, privateBusiness:2, alternatives:4.8, properties:[['Primary residence',4,1],['Investment property A',3.5,1.7],['Investment property B',2.5,1.3]]}
  };

  const properties = [
    {
      id: 'beverly-hills',
      label: 'Beverly Hills',
      x: 67, y: 69,
      lat: 34.08937, lng: -118.404517, zoom: 19,
      address: '1005 Schuyler Rd',
      location: 'Beverly Hills, CA 90210',
      beds: '5',
      baths: '6.5',
      sqft: '6,710 ft²',
      year: '1968',
      photoUrl: './assets/clients30/fallback-single_family_residence.svg',
      photoSource: 'Original category illustration — fictional scenario, not an actual property photograph',
      imageCount: 1,
      attomStatus: 'Live AVM route proven · private evidence only'
    },
    {
      id: 'malibu',
      label: 'Malibu',
      x: 59, y: 72,
      lat: 34.0259, lng: -118.7798, zoom: 17,
      address: 'Malibu Demo Property',
      location: 'Malibu, CA',
      beds: '6',
      baths: '7.5',
      sqft: '8,420 ft²',
      year: '2019',
      photoUrl: './assets/clients30/fallback-single_family_residence.svg',
      photoSource: 'Original category illustration — fictional scenario, not an actual property photograph',
      imageCount: 1,
      attomStatus: 'Illustrative property characteristics · ATTOM wiring pending'
    },
    {
      id: 'montecito',
      label: 'Montecito',
      x: 50, y: 64,
      lat: 34.4367, lng: -119.6321, zoom: 17,
      address: 'Montecito Demo Property',
      location: 'Montecito, CA',
      beds: '7',
      baths: '8',
      sqft: '9,180 ft²',
      year: '2016',
      photoUrl: './assets/clients30/fallback-single_family_residence.svg',
      photoSource: 'Original category illustration — fictional scenario, not an actual property photograph',
      imageCount: 1,
      attomStatus: 'Property discovery fixture'
    },
    {
      id: 'palo-alto',
      label: 'Palo Alto',
      x: 40, y: 30,
      lat: 37.4419, lng: -122.1430, zoom: 17,
      address: 'Palo Alto Demo Property',
      location: 'Palo Alto, CA',
      beds: '5',
      baths: '6',
      sqft: '6,950 ft²',
      year: '2021',
      photoUrl: './assets/clients30/fallback-single_family_residence.svg',
      photoSource: 'Original category illustration — fictional scenario, not an actual property photograph',
      imageCount: 1,
      attomStatus: 'Property discovery fixture'
    },
    {
      id: 'la-jolla',
      label: 'La Jolla',
      x: 72, y: 87,
      lat: 32.8328, lng: -117.2713, zoom: 17,
      address: 'La Jolla Demo Property',
      location: 'La Jolla, CA',
      beds: '6',
      baths: '7',
      sqft: '7,640 ft²',
      year: '2018',
      photoUrl: './assets/clients30/fallback-single_family_residence.svg',
      photoSource: 'Original category illustration — fictional scenario, not an actual property photograph',
      imageCount: 1,
      attomStatus: 'Property discovery fixture'
    }
  ];

  /* --- THAL3S_CLIENTS30 INTEGRATION (recovery-safe, additive; generated
     data from demo/property_preview_data.py; no interface redesign) --- */
  const clients30 = window.THAL3S_CLIENTS30;
  if (clients30 && clients30.enabled === true && Array.isArray(clients30.properties)) {
    clients30.properties.forEach(entry => {
      if (!properties.some(item => item.id === entry.id)) properties.push(entry);
    });
    Object.assign(clientProfiles, clients30.clientProfiles || {});
    Object.assign(clientProfileForProperty, clients30.clientProfileForProperty || {});
    Object.assign(assetProfiles, clients30.assetProfiles || {});
  }

  const markerLayer = document.getElementById('marker-layer');
  const photo = document.getElementById('property-photo');
  const fallback = document.getElementById('photo-fallback');
  const runButton = document.getElementById('run-assessment');
  const workspace = document.getElementById('workspace');
  const mapMode = document.getElementById('map-mode');
  const focusCaption = document.getElementById('focus-caption');
  const timeline = Array.from(document.querySelectorAll('#timeline li'));
  const achievements = Array.from(document.querySelectorAll('#achievement-rail .achievement'));
  let selectedId = properties[0].id;
  let runToken = 0;
  let googleMap = null;
  let googleMarkers = [];
  let googleMapsLoading = false;
  let judgeFlow = null;

  const byId = id => document.getElementById(id);
  const bps = value => Number.isFinite(value) ? (value / 100).toFixed(1) + '%' : '—';
  const moneyFromCents = value => Number.isFinite(value)
    ? new Intl.NumberFormat('en-US', {style:'currency', currency:'USD', maximumFractionDigits:0}).format(value / 100)
    : '—';

  const workingSteps = [
    {title:'Property selected', identity:'VERIFIED', identityNote:'Property identity confirmed', attom:'—', attomNote:'Evidence reconciliation next', avm:'—', avmNote:'Spread not measured', consistency:'—', consistencyNote:'Haircut not applied', ltv:'40.0%', ltvNote:'Base indicative LTV', review:'—', reviewNote:'Capacity not calculated'},
    {title:'Evidence reconciled', identity:'VERIFIED', identityNote:'Property identity confirmed', attom:'CONSISTENT', attomNote:'2 independent sources · fresh', avm:'—', avmNote:'Spread measurement next', consistency:'—', consistencyNote:'Haircut not applied', ltv:'40.0%', ltvNote:'Base indicative LTV', review:'—', reviewNote:'No capacity before risk adjustment'},
    {title:'Valuation spread measured', identity:'VERIFIED', identityNote:'Property identity confirmed', attom:'CONSISTENT', attomNote:'2 independent sources · fresh', avm:'100 bps', avmNote:'1.0% provider valuation spread', consistency:'—', consistencyNote:'Haircut not yet applied', ltv:'40.0%', ltvNote:'Base indicative LTV', review:'—', reviewNote:'Capacity not calculated'},
    {title:'Uncertainty haircut applied', identity:'VERIFIED', identityNote:'Property identity confirmed', attom:'CONSISTENT', attomNote:'Evidence remains usable', avm:'100 bps', avmNote:'Valuation spread', consistency:'1.0%', consistencyNote:'Haircut derived from valuation uncertainty', ltv:'40.0%', ltvNote:'Base indicative LTV', review:'—', reviewNote:'Effective LTV next'},
    {title:'Effective LTV adjusted', identity:'VERIFIED', identityNote:'Property identity confirmed', attom:'CONSISTENT', attomNote:'No blocking evidence conflict', avm:'100 bps', avmNote:'Valuation spread', consistency:'1.0%', consistencyNote:'Haircut only reduces capacity', ltv:'39.0%', ltvNote:'40.0% base → 39.0% effective', review:'—', reviewNote:'Capacity calculation next'},
    {title:'Indicative liquidity capacity calculated', identity:'VERIFIED', identityNote:'Property identity confirmed', attom:'CONSISTENT', attomNote:'Evidence gate passed', avm:'100 bps', avmNote:'Valuation spread', consistency:'1.0%', consistencyNote:'Uncertainty haircut', ltv:'39.0%', ltvNote:'Effective LTV', review:'$280,000', reviewNote:'Indicative only · not a credit decision'},
    {title:'Safeguarded review reached', identity:'VERIFIED', identityNote:'Property identity confirmed', attom:'CONSISTENT', attomNote:'2 sources · fresh evidence', avm:'100 bps', avmNote:'Valuation spread', consistency:'1.0%', consistencyNote:'Valuation haircut', ltv:'39.0%', ltvNote:'Effective LTV', review:'$280,000', reviewNote:'Indicative capacity · THAL3S explanation VERIFIED'}
  ];


  function applyJudgeFlow(flow) {
    if (!flow || flow.schema_version !== 'r12-judge-flow-v1' || !flow.payload) return false;
    const p = flow.payload;
    if (p.approval_authorized !== false || p.issuance_authorized !== false ||
        p.funding_authorized !== false || p.human_review_required !== true) return false;
    judgeFlow = flow;
    const spread = Number(p.value_spread_bps);
    const haircut = Number(p.haircut_bps);
    const base = Number(p.base_ltv_bps);
    const effective = Number(p.effective_ltv_bps);
    const capacity = Number(p.indicative_capacity_cents);
    const evidence = p.evidence_status || '—';
    const sources = Number(p.source_count) || 0;
    const freshness = p.evidence_freshness_state || '—';
    const verified = p.explanation_status === 'VERIFIED' ? 'VERIFIED' : 'UNAVAILABLE';
    const spreadText = Number.isFinite(spread) ? spread + ' bps' : '—';
    const haircutText = Number.isFinite(haircut) ? bps(haircut) : '—';
    const capacityText = p.capacity_state === 'BLOCKED' ? '$0 / BLOCKED' : moneyFromCents(capacity);

    /* THAL3S_CLIENTS30: stage signals rebuilt from the applied flow */
    stageSignals = [
      'Property identity ' + (p.property_identity_status === 'VERIFIED' ? 'confirmed' : 'NOT CONFIRMED') + ' · assessment initialized',
      sources + ' independent sources reconciled · evidence ' + evidence.toLowerCase() + ' · ' + freshness.toLowerCase(),
      'Provider valuation difference measured at ' + spread + ' bps',
      bps(haircut) + ' uncertainty haircut applied · capacity reduced, never increased',
      'Indicative LTV adjusted from ' + bps(base) + ' to ' + bps(effective),
      p.capacity_state === 'BLOCKED'
        ? 'Evidence gate blocked · indicative capacity $0 / BLOCKED'
        : (p.capacity_state === 'REVIEW_REQUIRED'
            ? 'Indicative liquidity capacity: ' + moneyFromCents(capacity) + ' · flagged for MANDATORY human review'
            : 'Indicative liquidity capacity: ' + moneyFromCents(capacity) + ' · no approval implied'),
      'THAL3S explanation ' + verified + ' · human review required'
    ];

    workingSteps[0] = {title:'Property selected', identity:p.property_identity_status, identityNote:'Property identity confirmed', attom:'—', attomNote:'Evidence reconciliation next', avm:'—', avmNote:'Spread not measured', consistency:'—', consistencyNote:'Haircut not applied', ltv:bps(base), ltvNote:'Base indicative LTV', review:'—', reviewNote:'Capacity not calculated'};
    workingSteps[1] = {title:'Evidence reconciled', identity:p.property_identity_status, identityNote:'Property identity confirmed', attom:evidence, attomNote:sources + ' independent sources · ' + freshness.toLowerCase(), avm:'—', avmNote:'Spread measurement next', consistency:'—', consistencyNote:'Haircut not applied', ltv:bps(base), ltvNote:'Base indicative LTV', review:'—', reviewNote:'No capacity before risk adjustment'};
    workingSteps[2] = {title:'Valuation spread measured', identity:p.property_identity_status, identityNote:'Property identity confirmed', attom:evidence, attomNote:sources + ' independent sources · ' + freshness.toLowerCase(), avm:spreadText, avmNote:bps(spread) + ' provider valuation spread', consistency:'—', consistencyNote:'Haircut not yet applied', ltv:bps(base), ltvNote:'Base indicative LTV', review:'—', reviewNote:'Capacity not calculated'};
    workingSteps[3] = {title:'Uncertainty haircut applied', identity:p.property_identity_status, identityNote:'Property identity confirmed', attom:evidence, attomNote:'Evidence remains usable', avm:spreadText, avmNote:'Valuation spread', consistency:haircutText, consistencyNote:'Haircut derived from uncertainty', ltv:bps(base), ltvNote:'Base indicative LTV', review:'—', reviewNote:'Effective LTV next'};
    workingSteps[4] = {title:'Effective LTV adjusted', identity:p.property_identity_status, identityNote:'Property identity confirmed', attom:evidence, attomNote:'No blocking evidence conflict', avm:spreadText, avmNote:'Valuation spread', consistency:haircutText, consistencyNote:'Haircut only reduces capacity', ltv:bps(effective), ltvNote:bps(base) + ' base → ' + bps(effective) + ' effective', review:'—', reviewNote:'Capacity calculation next'};
    workingSteps[5] = {title:'Indicative liquidity capacity calculated', identity:p.property_identity_status, identityNote:'Property identity confirmed', attom:evidence, attomNote:'Evidence gate ' + (p.capacity_state === 'BLOCKED' ? 'blocked' : 'passed'), avm:spreadText, avmNote:'Valuation spread', consistency:haircutText, consistencyNote:'Uncertainty haircut', ltv:bps(effective), ltvNote:'Effective LTV', review:capacityText, reviewNote:'Indicative only · not a credit decision'};
    workingSteps[6] = {title:'Safeguarded review reached', identity:p.property_identity_status, identityNote:'Property identity confirmed', attom:evidence, attomNote:sources + ' sources · ' + freshness.toLowerCase() + ' evidence', avm:spreadText, avmNote:'Valuation spread', consistency:haircutText, consistencyNote:'Valuation haircut', ltv:bps(effective), ltvNote:'Effective LTV', review:capacityText, reviewNote:'Indicative capacity · THAL3S explanation ' + verified};
    setText('working-badge', 'DETERMINISTIC · VERIFIED');
    return true;
  }

  let defaultJudgeFlow = null;

  async function loadJudgeFlow() {
    try {
      const response = await fetch('./judge-flow.json', {cache:'no-store'});
      if (!response.ok) return false;
      const flow = await response.json();
      defaultJudgeFlow = flow;
      return applyJudgeFlow(flow);
    } catch (_) {
      return false;
    }
  }

  /* THAL3S_CLIENTS30: apply the selected client's deterministic flow when
     one exists; otherwise keep the deployment's original flow. */
  function applyFlowForProperty(id) {
    const clientFlow = clients30 && clients30.judgeFlows && clients30.judgeFlows[id];
    if (clientFlow) return applyJudgeFlow(clientFlow);
    if (defaultJudgeFlow) return applyJudgeFlow(defaultJudgeFlow);
    return false;
  }

  /* THAL3S_CLIENTS30: stageSignals is rebuilt per applied flow below */
  let stageSignals = [
    'Property identity confirmed · assessment initialized',
    '2 independent sources reconciled · evidence remains consistent',
    'Provider valuation difference measured at 100 bps',
    '1.0% uncertainty haircut applied · capacity reduced, never increased',
    'Indicative LTV adjusted from 40.0% to 39.0%',
    'Indicative liquidity capacity: $280,000 · no approval implied',
    'THAL3S explanation VERIFIED · human review required'
  ];

  function updateAssessmentSignal(index) {
    const signal = stageSignals[index] || '7-stage deterministic intelligence path · no automated approval';
    setText('assessment-signal', signal);
  }

  function updateWorkingPanel(index) {
    const state = workingSteps[index] || workingSteps[0];
    setText('working-title', state.title);
    setText('work-identity', state.identity);
    setText('work-identity-note', state.identityNote);
    setText('work-attom', state.attom);
    setText('work-attom-note', state.attomNote);
    setText('work-avm', state.avm);
    setText('work-avm-note', state.avmNote);
    setText('work-consistency', state.consistency);
    setText('work-consistency-note', state.consistencyNote);
    setText('work-ltv', state.ltv);
    setText('work-ltv-note', state.ltvNote);
    setText('work-review', state.review);
    setText('work-review-note', state.reviewNote);

    const ids = ['work-identity','work-attom','work-avm','work-consistency','work-ltv','work-review'];
    ids.forEach((id, metricIndex) => {
      const tile = byId(id).parentElement;
      tile.classList.toggle('live', metricIndex <= index && byId(id).textContent !== '—');
      tile.classList.toggle('warn', id === 'work-review' && state.review === 'REQUIRED');
    });
  }



  function googleMapsKey() {
    const fromConfig = window.THAL3S_MAPS_CONFIG && window.THAL3S_MAPS_CONFIG.googleMapsApiKey;
    const fromSession = sessionStorage.getItem('thal3s_google_maps_key');
    const key = fromConfig || fromSession || '';
    return typeof key === 'string' ? key.trim() : '';
  }

  function markerIcon(active) {
    if (!window.google?.maps) return undefined;
    return {
      path: google.maps.SymbolPath.CIRCLE,
      scale: active ? 9 : 7,
      fillColor: active ? '#9fe0ba' : '#d9b76a',
      fillOpacity: 1,
      strokeColor: '#0b0e0d',
      strokeWeight: 2
    };
  }

  function syncGoogleMarkers() {
    if (!googleMap || !window.google?.maps) return;
    googleMarkers.forEach(({property, marker}) => {
      marker.setIcon(markerIcon(property.id === selectedId));
      marker.setZIndex(property.id === selectedId ? 20 : 10);
    });
  }

  function initializeGoogleMap() {
    if (!window.google?.maps || googleMap) return;
    const container = byId('google-map');
    const mapContainer = byId('california-map');
    container.hidden = false;
    mapContainer.classList.add('google-active');

    googleMap = new google.maps.Map(container, {
      center: {lat: 36.7783, lng: -119.4179},
      zoom: 6,
      mapTypeId: 'satellite',
      disableDefaultUI: true,
      zoomControl: true,
      gestureHandling: 'greedy',
      clickableIcons: false,
      backgroundColor: '#0b0e0d'
    });

    googleMarkers = properties.map(property => {
      const marker = new google.maps.Marker({
        position: {lat: property.lat, lng: property.lng},
        map: googleMap,
        title: property.label,
        icon: markerIcon(property.id === selectedId),
        zIndex: property.id === selectedId ? 20 : 10
      });
      marker.addListener('click', () => selectProperty(property.id));
      return {property, marker};
    });

    const connectButton = byId('connect-google-map');
    connectButton.textContent = 'GOOGLE SATELLITE CONNECTED';
    connectButton.classList.add('connected');
    syncGoogleMarkers();
  }

  function loadGoogleMaps() {
    if (googleMap || googleMapsLoading) return;
    const key = googleMapsKey();
    if (!key) return;

    googleMapsLoading = true;
    const loading = document.createElement('div');
    loading.className = 'map-loading';
    loading.id = 'map-loading';
    loading.textContent = 'Loading Google satellite imagery…';
    byId('california-map').appendChild(loading);

    window.__thal3sGoogleMapsReady = () => {
      googleMapsLoading = false;
      loading.remove();
      initializeGoogleMap();
      delete window.__thal3sGoogleMapsReady;
    };

    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=' +
      encodeURIComponent(key) + '&v=weekly&loading=async&callback=__thal3sGoogleMapsReady';
    script.async = true;
    script.onerror = () => {
      googleMapsLoading = false;
      loading.remove();
      sessionStorage.removeItem('thal3s_google_maps_key');
      byId('connect-google-map').textContent = 'GOOGLE MAP FAILED — RETRY';
      delete window.__thal3sGoogleMapsReady;
    };
    document.head.appendChild(script);
  }

  function requestGoogleMapsKey() {
    const entered = window.prompt(
      'Paste the Google Maps browser API key. It stays only in this browser session and is never written to GitHub.'
    );
    if (!entered) return;
    const key = entered.trim();
    if (key.length < 20 || /\s/.test(key)) {
      window.alert('That does not look like a valid browser API key.');
      return;
    }
    sessionStorage.setItem('thal3s_google_maps_key', key);
    loadGoogleMaps();
  }

  function setText(id, value) {
    const node = byId(id);
    if (node) node.textContent = value;
  }

  function moneyM(value) {
    return '$' + Number(value).toFixed(2) + 'M';
  }

  function renderClientProfile(propertyId) {
    const key = clientProfileForProperty[propertyId] || 'los';
    const profile = clientProfiles[key];
    setText('client-name', profile.name);
    setText('client-summary', moneyM(profile.net) + ' net worth · ' + moneyM(profile.property) + ' property exposure');
    setText('client-net', moneyM(profile.net));
    setText('client-property', moneyM(profile.property));
    setText('client-other', moneyM(profile.other));
    setText('client-debt', moneyM(profile.debt));
    setText('client-other-debt', moneyM(profile.otherDebt));
    setText('client-request', moneyM(profile.request));
  }

  function renderPortfolio(propertyId) {
    const key = clientProfileForProperty[propertyId] || 'los';
    const profile = clientProfiles[key];
    const assets = assetProfiles[key];
    const gross = profile.property + profile.other;
    const liabilities = profile.debt + profile.otherDebt;
    const haircutPct = 10;
    const ltvPct = 60;
    let portfolioCapacity = 0;

    const allocation = [
      ['Real estate', profile.property],
      ['Cash / deposits', assets.cash],
      ['Listed equities', assets.equities],
      ['Fixed income', assets.bonds],
      ['Private business', assets.privateBusiness],
      ['Alternatives', assets.alternatives]
    ];
    const allocationNode = byId('portfolio-allocation');
    allocationNode.replaceChildren();
    allocation.forEach(([name, value]) => {
      const row = document.createElement('div');
      row.className = 'alloc-item';
      const label = document.createElement('span');
      label.textContent = name;
      const track = document.createElement('div');
      track.className = 'alloc-track';
      const fill = document.createElement('div');
      fill.className = 'alloc-fill';
      fill.style.width = Math.max(0, Math.min(100, gross ? (value / gross) * 100 : 0)).toFixed(1) + '%';
      track.appendChild(fill);
      const amount = document.createElement('strong');
      amount.textContent = moneyM(value);
      row.append(label, track, amount);
      allocationNode.appendChild(row);
    });

    assets.properties.forEach(([label, value, debt]) => {
      const cap = Math.max(0, value * (1 - haircutPct / 100) * (ltvPct / 100) - debt);
      portfolioCapacity += cap;
    });

    setText('portfolio-gross', moneyM(gross));
    setText('portfolio-liab', moneyM(liabilities));
    setText('portfolio-net', moneyM(profile.net));
    setText('portfolio-cash', moneyM(assets.cash));
    setText('portfolio-capacity', moneyM(portfolioCapacity));
    setText('portfolio-total', moneyM(assets.cash + portfolioCapacity));

    /* THAL3S_CLIENTS30: for the fictional clients the portfolio panel's
       capacity fields carry the credit-engine-v2 outputs (the app's own
       demo heuristic stays for the original five demo properties). */
    const clientFlow = clients30 && clients30.judgeFlows && clients30.judgeFlows[propertyId];
    if (clientFlow) {
      const ra = clientFlow.payload;
      setText('portfolio-capacity', ra.capacity_state === 'BLOCKED' ? '$0.00M / BLOCKED' : moneyM(ra.indicative_capacity_cents / 100 / 1000000));
      setText('portfolio-total', ra.capacity_state === 'BLOCKED' ? '$0.00M / BLOCKED' : moneyM(assets.cash + ra.indicative_capacity_cents / 100 / 1000000));
    }

    const concentration = gross ? profile.property / gross : 0;
    const cashRatio = gross ? assets.cash / gross : 0;
    const leverage = gross ? liabilities / gross : 0;
    const securedRatio = profile.property ? profile.debt / profile.property : 0;
    const market = concentration >= .45 ? 'HIGH' : concentration >= .30 ? 'MODERATE' : 'LOW';
    const liquidity = cashRatio < .10 ? 'HIGH' : cashRatio < .20 ? 'MODERATE' : 'LOW';
    const credit = (securedRatio >= .45 || leverage >= .40) ? 'HIGH' : (securedRatio >= .25 || leverage >= .20) ? 'MODERATE' : 'LOW';

    setText('risk-market', market);
    setText('risk-market-detail', (concentration * 100).toFixed(1) + '% of gross assets in real estate');
    setText('risk-liquidity', liquidity);
    setText('risk-liquidity-detail', (cashRatio * 100).toFixed(1) + '% cash-to-assets');
    setText('risk-credit', credit);
    setText('risk-credit-detail', (securedRatio * 100).toFixed(1) + '% secured RE LTV · ' + (leverage * 100).toFixed(1) + '% overall leverage');
  }

  function renderMarkers() {
    markerLayer.replaceChildren();
    properties.forEach(property => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'property-marker' + (property.id === selectedId ? ' active' : '');
      button.style.left = property.x + '%';
      button.style.top = property.y + '%';
      button.dataset.label = property.label;
      button.setAttribute('aria-label', 'Select ' + property.label + ' property');
      button.addEventListener('click', () => selectProperty(property.id));
      markerLayer.appendChild(button);
    });
  }

  function resetTimeline() {
    runToken += 1;
    timeline.forEach((item, index) => {
      item.classList.remove('active', 'complete');
      item.querySelector('b').textContent = index === 0 ? 'READY' : 'WAITING';
    });
    achievements.forEach((item, index) => {
      item.classList.remove('active', 'complete');
      if (index === 0) item.classList.add('active');
    });
    setText('assessment-title', 'Ready to assess selected property');
    setText('assessment-signal', '7-stage deterministic intelligence path · no automated approval');
    setText('working-title', 'Awaiting property assessment');
    updateWorkingPanel(0);
    setText('outcome-status', 'NOT STARTED');
    setText('outcome-evidence', 'PRIVATE');
    runButton.disabled = false;
    setText('run-context', 'Property selected');
    runButton.textContent = 'Run THAL3S 16';
    const finalCard = byId('final-card');
    finalCard.hidden = true;
    finalCard.classList.remove('show');
  }

  function selectProperty(id) {
    const property = properties.find(item => item.id === id);
    if (!property) return;
    selectedId = id;
    renderMarkers();
    setText('property-address', property.address);
    setText('property-location', property.location);
    /* For synthetic clients, disclose missing physical characteristics
       rather than showing unexplained dashes or inventing specifications. */
    const syntheticClient = /^cf30-\d{3}$/.test(property.id);
    const missingLabel = 'Not provided';
    setText('fact-beds', syntheticClient && property.beds === '—' ? missingLabel : property.beds);
    setText('fact-baths', syntheticClient && property.baths === '—' ? missingLabel : property.baths);
    setText('fact-sqft', syntheticClient && property.sqft === '—' ? missingLabel : property.sqft);
    setText('fact-year', syntheticClient && property.year === '—' ? missingLabel : property.year);
    setText('photo-source', property.photoSource);
    setText('photo-count', property.imageCount + (property.imageCount === 1 ? ' image' : ' images'));
    setText('attom-status', property.attomStatus);
    renderClientProfile(property.id);
    if (!byId('portfolio-panel').hidden) renderPortfolio(property.id);

    if (property.photoUrl) {
      photo.src = property.photoUrl;
      photo.alt = 'Licensed property listing image for ' + property.address;
      photo.hidden = false;
      fallback.hidden = true;
      fallback.style.setProperty('display', 'none', 'important');
    } else {
      photo.hidden = true;
      photo.removeAttribute('src');
      photo.alt = '';
      fallback.hidden = false;
      fallback.style.removeProperty('display');
    }
    focusCaption.textContent = property.label + ' · ' + property.location;
    setText('map-instruction', 'Selected · ' + property.label);
    setText('run-context', property.label + ' selected');
    workspace.classList.add('focused');
    mapMode.textContent = property.label.toUpperCase() + ' FOCUS';
    const activeMarker = markerLayer.querySelector('.property-marker.active');
    if (activeMarker) { activeMarker.classList.remove('pulse'); void activeMarker.offsetWidth; activeMarker.classList.add('pulse'); }
    applyFlowForProperty(id);
    if (googleMap) {
      googleMap.panTo({lat: property.lat, lng: property.lng});
      googleMap.setZoom(property.zoom || 18);
      if (typeof googleMap.setTilt === 'function') googleMap.setTilt(45);
      syncGoogleMarkers();
    }
    resetTimeline();
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function runAssessment() {
    const token = ++runToken;
    runButton.disabled = true;
    setText('run-context', 'THAL3S 16 running');
    runButton.textContent = 'Assessing…';
    const finalCard = byId('final-card');
    finalCard.hidden = true;
    finalCard.classList.remove('show');
    setText('assessment-title', 'THAL3S 16 is evaluating the selected property');
    setText('outcome-status', 'IN PROGRESS');

    for (let i = 0; i < timeline.length; i += 1) {
      if (token !== runToken) return;
      timeline.forEach((item, index) => {
        item.classList.toggle('complete', index < i);
        item.classList.toggle('active', index === i);
        item.querySelector('b').textContent =
          index < i ? 'COMPLETE' : index === i ? 'RUNNING' : 'WAITING';
      });
      achievements.forEach((item, index) => {
        item.classList.toggle('complete', index < i);
        item.classList.toggle('active', index === i);
      });

      updateWorkingPanel(i);
      updateAssessmentSignal(i);
      if (judgeFlow && judgeFlow.events[i]) {
        const event = judgeFlow.events[i];
        /* event status is represented by the synchronized rail and working metrics */
      }
      if (i === 1 && judgeFlow) setText('outcome-evidence', judgeFlow.payload.source_count + ' SOURCES · ' + judgeFlow.payload.evidence_freshness_state);
      await sleep(i === 0 ? 240 : 360);
    }

    if (token !== runToken) return;
    timeline.forEach(item => {
      item.classList.remove('active');
      item.classList.add('complete');
      item.querySelector('b').textContent = 'COMPLETE';
    });
    achievements.forEach(item => {
      item.classList.remove('active');
      item.classList.add('complete');
    });

    updateWorkingPanel(6);
    setText('final-property-address', byId('property-address').textContent);
    setText('final-property-location', byId('property-location').textContent);
    setText('final-avm', byId('work-consistency').textContent);
    setText('final-ltv', byId('work-ltv').textContent);
    setText('final-consistency', byId('work-review').textContent);
    setText('final-attom', judgeFlow ? (judgeFlow.payload.evidence_status + ' · ' + judgeFlow.payload.source_count + ' SOURCES') : byId('outcome-evidence').textContent);
    finalCard.hidden = false;
    void finalCard.offsetWidth;
    finalCard.classList.add('show');
    setText('assessment-title', 'Indicative liquidity identified · human review required');
    /* THAL3S_CLIENTS30: final signal derives from the applied flow */
    const fp = judgeFlow && judgeFlow.payload;
    setText('assessment-signal', fp ? (
      (fp.capacity_state === 'BLOCKED'
        ? 'Evidence gate BLOCKED · $0 / BLOCKED · human review required'
        : 'Evidence ' + String(fp.evidence_status || '—').toLowerCase() + ' · ' + bps(fp.haircut_bps) + ' haircut · ' + bps(fp.effective_ltv_bps) + ' effective LTV · ' +
          (fp.capacity_state === 'REVIEW_REQUIRED'
            ? moneyFromCents(fp.indicative_capacity_cents) + ' indicative capacity · flagged for MANDATORY human review'
            : moneyFromCents(fp.indicative_capacity_cents) + ' indicative capacity'))
    ) : 'Assessment complete · human review required');
    setText('outcome-status', 'HUMAN REVIEW REQUIRED');
    setText('outcome-evidence', judgeFlow ? 'RECONCILED / PRIVATE' : 'MAPPED / PRIVATE');
    setText('run-context', 'Indicative liquidity identified');
    runButton.textContent = 'Assessment complete';
  }

  function returnOverview() {
    runToken += 1;
    workspace.classList.remove('focused');
    mapMode.textContent = 'CALIFORNIA OVERVIEW';
    setText('map-instruction', 'Select a property to begin');
    if (googleMap) {
      googleMap.setTilt(0);
      googleMap.panTo({lat: 36.7783, lng: -119.4179});
      googleMap.setZoom(6);
      syncGoogleMarkers();
    }
    setText('assessment-title', 'Ready to assess selected property');
    setText('assessment-signal', '7-stage deterministic intelligence path · no automated approval');
    setText('working-title', 'Property selected');
    achievements.forEach(item => item.classList.remove('active','complete'));
    setText('outcome-status', 'NOT STARTED');
    runButton.disabled = false;
    runButton.textContent = 'Run THAL3S 16';
  }

  byId('client-toggle').addEventListener('click', () => {
    const details = byId('client-details');
    const expanded = byId('client-toggle').getAttribute('aria-expanded') === 'true';
    byId('client-toggle').setAttribute('aria-expanded', String(!expanded));
    details.hidden = expanded;
    setText('client-expand-label', expanded ? 'Expand' : 'Collapse');
  });

  byId('portfolio-toggle').addEventListener('click', () => {
    const panel = byId('portfolio-panel');
    const opening = panel.hidden;
    panel.hidden = !opening;
    byId('portfolio-toggle').setAttribute('aria-expanded', String(opening));
    byId('portfolio-toggle').textContent = opening ? 'Hide Full Portfolio & Total Liquidity' : 'View Full Portfolio & Total Liquidity';
    if (opening) renderPortfolio(selectedId);
  });

  const setSourcesOpen = opening => {
    byId('sources-panel').hidden = !opening;
    byId('sources-toggle').setAttribute('aria-expanded', String(opening));
    byId('sources-toggle').textContent = opening ? 'Hide Sources & Methodology' : 'Sources & Methodology';
    if (opening) byId('sources-panel').scrollIntoView({behavior:'smooth', block:'start'});
  };

  byId('sources-toggle').addEventListener('click', () => setSourcesOpen(byId('sources-panel').hidden));
  byId('sources-close').addEventListener('click', () => setSourcesOpen(false));

  byId('connect-google-map').addEventListener('click', () => {
    if (googleMap) return;
    if (googleMapsKey()) loadGoogleMaps();
    else requestGoogleMapsKey();
  });
  byId('reset-map').addEventListener('click', returnOverview);
  byId('back-overview').addEventListener('click', returnOverview);
  runButton.addEventListener('click', runAssessment);

  window.THAL3SPropertyDemo = Object.freeze({
    selectProperty,
    setLicensedPhoto(propertyId, photoUrl, count = 1) {
      const property = properties.find(item => item.id === propertyId);
      if (!property || typeof photoUrl !== 'string' || !photoUrl.startsWith('https://')) return false;
      property.photoUrl = photoUrl;
      property.photoSource = 'ATTOM Slipstream MLS image · licensed backend URL';
      property.imageCount = Number.isInteger(count) && count > 0 ? count : 1;
      if (selectedId === propertyId) selectProperty(propertyId);
      return true;
    },
    applyAttomFacts(propertyId, facts) {
      const property = properties.find(item => item.id === propertyId);
      if (!property || !facts || typeof facts !== 'object') return false;
      for (const key of ['beds', 'baths', 'sqft', 'year', 'attomStatus']) {
        if (Object.prototype.hasOwnProperty.call(facts, key)) property[key] = String(facts[key]);
      }
      if (selectedId === propertyId) selectProperty(propertyId);
      return true;
    }
  });

  renderMarkers();
  selectProperty(selectedId);
  returnOverview();
  loadJudgeFlow().then(() => updateWorkingPanel(0));
  if (googleMapsKey()) loadGoogleMaps();
})()

/* =====================================================================
   sprintvis-s03 BEGIN — additive block (SprintVis S03: full client
   characteristics + six economic regimes, restored inside the recovered
   design). ADDITIVE-ONLY: no original line above is removed or changed.
   This block loads the generated module ./clients30-profiles.js and the
   additive stylesheet ./profiles-integration.css at runtime (script/link
   elements appended to document.head) because index.html is pinned
   byte-exact to the recovered deployment plus exactly one
   clients30-integration.js script tag by the coordinator-owned recovery
   suites — no second script tag may be added to index.html. Every figure
   comes from the committed records through the generated module; missing
   values render as explicit placeholders (—/NOT_MEASURED), never zero,
   never invented; a regime selection NEVER changes a credit decision.
   ===================================================================== */
;(() => {
  const PROFILES_SRC = './clients30-profiles.js';
  const STYLESHEET_SRC = './profiles-integration.css';
  const MISSING = '—';
  const NOT_MEASURED = 'NOT_MEASURED';

  const el = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  };
  const fmtUsd = cents => Number.isInteger(cents)
    ? new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD',
      maximumFractionDigits: 0}).format(cents / 100)
    : MISSING;
  const fmtBps = bps => Number.isInteger(bps)
    ? (bps / 100).toFixed(1) + '% (' + bps + ' bps)' : MISSING;
  const orMissing = value => (value === null || value === undefined)
    ? MISSING : value;

  let profiles = null;
  let selectedRegimeId = null;
  let currentClientId = null;
  let charBody = null;
  let regimeBody = null;
  let regimeDetailOpen = false;

  const clientIdFromDom = () => {
    const address = document.getElementById('property-address');
    const match = address && address.textContent.match(/cf30-\d{3}/);
    return match ? match[0] : null;
  };

  const row = (label, value, note, muted) => {
    const line = el('div', 's03-rowline');
    line.append(el('span', null, label));
    const b = el('b', muted ? 's03-muted' : null, value);
    if (note) b.setAttribute('title', note);
    line.append(b);
    return line;
  };

  const chip = (text, kind) => el('span', 's03-chip' + (kind ? ' s03-' + kind : ''), text);

  const metric = (label, value, muted) => {
    const cell = el('div');
    cell.append(el('span', null, label));
    cell.append(el('strong', muted ? 's03-muted' : null, value));
    return cell;
  };

  const group = (title, chips) => {
    const wrap = el('div', 's03-group');
    const head = el('div', 's03-group-head');
    head.append(el('strong', null, title));
    if (chips && chips.length) {
      const holder = el('span');
      chips.forEach(c => holder.append(c));
      head.append(holder);
    }
    wrap.append(head);
    return wrap;
  };

  /* ---------------- client characteristics panel ---------------- */
  const renderCharacteristics = client => {
    charBody.replaceChildren();
    if (!client) {
      const note = el('div', 's03-unavailable',
        'Original demo property — the clients30 fixture carries no synthetic ' +
        'client record for the five original demo properties (NOT_IN_FIXTURE). ' +
        'The five originals, their demo client card and the schematic map stay ' +
        'unchanged. Select a fictional client marker to see its full record.');
      charBody.append(note);
      return;
    }
    const fin = client.financials;
    const business = fin.business;
    const request = client.request;
    const assessment = client.assessment;
    const portfolio = client.portfolio;

    const metrics = el('div', 's03-metrics');
    metrics.append(
      metric('Total net worth', fmtUsd(fin.personal_net_worth_cents)),
      metric('Liquid assets / cash', fmtUsd(fin.liquid_assets_cents) +
        (fin.liquid_assets_evidence_status === 'MISSING'
          ? ' · MISSING EVIDENCE' : '')),
      metric('Other assets', fmtUsd(fin.other_assets_cents)),
      metric('Secured property debt', fmtUsd(portfolio.secured_debt_cents)),
      metric('Other (unsecured) liabilities', fmtUsd(fin.other_liabilities_cents)),
      metric('Requested loan amount', fmtUsd(request.requested_amount_cents)));
    charBody.append(metrics);

    const income = group('Income & business cash flow');
    income.append(
      row('Annual income', fmtUsd(fin.annual_income_cents)),
      row('Annual expenditures', fmtUsd(fin.annual_expenditures_cents)),
      row('Annual net cash flow (engine)',
          Number.isInteger(assessment.annual_net_cashflow_cents)
            ? fmtUsd(assessment.annual_net_cashflow_cents)
            : MISSING + ' (' + NOT_MEASURED + ')',
          'null in the record stays missing, never zero',
          !Number.isInteger(assessment.annual_net_cashflow_cents)));
    if (business) {
      income.append(
        row('Business entity', business.entity_name + ' — ' + business.description),
        row('Business annual revenue', fmtUsd(business.annual_revenue_cents)),
        row('Business annual cash flow', fmtUsd(business.annual_cashflow_cents) +
          ' · ' + orMissing(business.cashflow_evidence_status)));
    } else {
      income.append(row('Business cash flow',
        MISSING + ' (NOT_IN_RECORD)', 'business is null for this client', true));
    }
    charBody.append(income);

    const borrower = group('Borrower / entity structure');
    borrower.append(
      row('Client type', client.client_type),
      row('Ownership structure', client.ownership_structure),
      row('Identity note', client.identity_note),
      row('Ownership verified',
          String(client.borrower_evidence.ownership_verified)),
      row('Liens clear', String(client.borrower_evidence.liens_clear)),
      row('Identity evidence', client.borrower_evidence.identity_evidence_status),
      row('Client category',
          client.category + ' · ' + orMissing(client.category_label)));
    charBody.append(borrower);

    const reqGroup = group('Borrowing request');
    reqGroup.append(
      row('Requested amount', fmtUsd(request.requested_amount_cents)),
      row('Purpose', request.purpose),
      row('Urgency', request.urgency),
      row('Intended facility', request.facility_intent),
      row('Request contract', request.request_contract));
    charBody.append(reqGroup);

    const portfolioGroup = group('Real-estate portfolio & collateral',
      [chip(portfolio.properties_count + ' properties'),
       chip('largest share ' +
         (Number.isInteger(portfolio.largest_property_share_bps)
           ? (portfolio.largest_property_share_bps / 100).toFixed(1) + '%'
           : NOT_MEASURED))]);
    portfolioGroup.append(
      row('Usable property value (basis)', fmtUsd(portfolio.usable_property_value_cents),
        portfolio.computed_note),
      row('Total secured debt', fmtUsd(portfolio.secured_debt_cents),
        portfolio.computed_note));
    client.properties.forEach(property => {
      const breakdown = assessment.property_capacity_breakdown.find(
        entry => entry.property_id === property.property_id) || {};
      portfolioGroup.append(
        row(property.property_id + ' · ' + property.property_type,
          (Number.isInteger(property.value_cents)
            ? fmtUsd(property.value_cents)
            : MISSING + ' (' + property.value_evidence_status + ' — no value, never zero)') +
          ' · evidence ' + property.value_evidence_status),
        row('  value spread',
          Number.isInteger(property.valuation_spread_bps)
            ? property.valuation_spread_bps + ' bps'
            : MISSING + ' (' + NOT_MEASURED + ')',
          null, !Number.isInteger(property.valuation_spread_bps)),
        row('  secured debt', fmtUsd(property.existing_secured_debt_cents)),
        row('  reserved costs', fmtUsd(property.reserved_costs_cents)),
        row('  collateral eligibility',
          'usable valuation: ' + orMissing(String(breakdown.usable_valuation)) +
          ' · capacity ' + fmtUsd(breakdown.capacity_cents) +
          ' · ceiling ' + fmtUsd(breakdown.ceiling_cents)),
        row('  LTV / haircut',
          Number.isInteger(breakdown.effective_ltv_bps)
            ? 'effective ' + fmtBps(breakdown.effective_ltv_bps) +
              ' · haircut ' + fmtBps(breakdown.haircut_bps) +
              ' (base ' + fmtBps(breakdown.base_ltv_bps) + ')'
            : MISSING + ' (' + NOT_MEASURED + ')'));
    });
    charBody.append(portfolioGroup);

    const riskGroup = group('Risk dimensions (13-dimension fixture record)',
      [chip(client.risk_dimensions.filter(d => d.applicability === 'APPLICABLE')
        .length + ' applicable')]);
    client.risk_dimensions.forEach(dim => {
      const applicable = dim.applicability === 'APPLICABLE';
      const line = el('div', 's03-riskdim');
      line.append(el('span', null,
        dim.id + ' · ' + dim.name + ' — ' + dim.applicability));
      line.append(el('b', null,
        applicable
          ? (dim.evidence_intensity || NOT_MEASURED) + ' evidence'
          : dim.evidence_intensity === null
            ? '— (' + NOT_MEASURED + ')'
            : String(dim.evidence_intensity)));
      const small = el('small', null, 'maturity: ' + dim.maturity);
      line.append(small);
      riskGroup.append(line);
    });
    charBody.append(riskGroup);

    const decision = group('Credit assessment · committed engine record',
      [chip(assessment.expected_status),
       chip('human review ' + String(client.human_review.human_review_required))]);
    decision.append(
      row('Indicative capacity', fmtUsd(assessment.expected_capacity_cents)),
      row('Requested LTV',
        Number.isInteger(assessment.requested_ltv_bps)
          ? fmtBps(assessment.requested_ltv_bps)
          : MISSING + ' (' + NOT_MEASURED + ')',
        null, !Number.isInteger(assessment.requested_ltv_bps)),
      row('Gross property capacity', fmtUsd(assessment.gross_property_capacity_cents)),
      row('Usable valuation basis', fmtUsd(assessment.usable_valuation_basis_cents)),
      row('Reason codes',
        assessment.reason_codes.length
          ? assessment.reason_codes.join(' · ')
          : '(none recorded)'),
      row('Decision contract',
        assessment.decision_contract + ' · ' + assessment.engine_version +
        ' · ' + assessment.ltv_rounding_contract),
      row('Maturity label', assessment.maturity_label),
      row('Relevant rule source', assessment.policy_reference + ' · ' +
        assessment.threshold_calibration,
        'fixture-record fields carried verbatim; no rule text exists in the record'),
      row('Human review status', client.human_review.human_review_status));
    charBody.append(decision);

    const review = group('Missing information & required next evidence');
    client.missing_information.forEach(item =>
      review.append(row(item, '—', 'explicitly missing — never zero, never invented', true)));
    client.required_next_evidence.forEach(item =>
      review.append(row('Required next: ' + item, 'PENDING')));
    charBody.append(review);

    const chips = el('div', 's03-chips');
    client.safeguards.forEach(s => chips.append(chip(s)));
    charBody.append(chips);
    charBody.append(el('p', 's03-note',
      'Full synthetic client record from demo/fixtures/clients_30_v1.json ' +
      '(clients30-v1) and its credit-engine-v2 reference assessment — ' +
      'fictional data, illustrative only, no credit approval, no issuance, ' +
      'no funding. Figures equal the committed record exactly (frontend === ' +
      'fixture); missing values stay explicit placeholders.'));
  };

  /* ---------------- six economic regimes panel ---------------- */
  const regimeChip = regime => {
    const button = el('button', 's03-regime-chip', regime.label);
    button.type = 'button';
    button.dataset.regimeId = regime.id;
    button.setAttribute('aria-pressed',
      String(regime.id === selectedRegimeId));
    button.append(el('small', null,
      regime.provenance + ' · severity ' + regime.severity + '/5'));
    button.addEventListener('click', () => {
      selectedRegimeId = regime.id;
      regimeDetailOpen = false;
      renderRegimes();
    });
    return button;
  };

  const renderRegimes = () => {
    regimeBody.replaceChildren();
    const regimes = profiles.regimes;
    if (!selectedRegimeId && regimes.length) selectedRegimeId = regimes[0].id;
    const chips = el('div', 's03-regime-chips');
    regimes.forEach(regime => chips.append(regimeChip(regime)));
    regimeBody.append(chips);

    const regime = regimes.find(r => r.id === selectedRegimeId) || regimes[0];
    const synthetic = regime.provenance === 'AUTHORED_SYNTHETIC';
    const badges = el('div', 's03-chips');
    badges.append(
      chip(regime.provenance + (synthetic ? ' · NOT OBSERVED' : ''), synthetic ? 'authored' : 'frozen'),
      chip('direction: ' + regime.direction),
      chip('severity ' + regime.severity + '/5'));
    if (regime.evidence_type) badges.append(chip(regime.evidence_type));
    if (regime.is_assumption_not_observation === true) {
      badges.append(chip('supplied assumption — not an observation', 'authored'));
    }
    regimeBody.append(badges);
    regimeBody.append(el('p', 's03-desc', regime.description));

    const client = currentClientId ? profiles.clients[currentClientId] : null;
    const ownContext = client && client.economic_regime.regime_id === regime.id;
    const contextLine = el('p', 's03-note');
    if (client && ownContext) {
      contextLine.textContent =
        'This is ' + client.client_id + "'s own committed assessment context " +
        '(record fields: snapshot ' + orMissing(regime.macro_snapshot_id) +
        ', anchor ' + orMissing(regime.anchor_month) + ', cutoff ' +
        orMissing(regime.assessment_cutoff) + ', criterion ' +
        orMissing(regime.selection_criterion) + '). ' +
        regime.client_anchor_count + ' of the 30 fictional clients are anchored here.';
    } else if (client) {
      contextLine.textContent =
        'NOT this client\u2019s committed context (that is the ' +
        client.economic_regime.regime_id + ' regime). No per-client regime ' +
        'recomputation exists for ' + client.client_id + ' under ' +
        regime.id + ' — none is invented (' + NOT_MEASURED + '). The ' +
        'client\u2019s committed credit decision is unchanged (see the ' +
        'separation note below).';
    } else {
      contextLine.textContent =
        'No fictional client selected — showing the committed regime record ' +
        'only. ' + regime.client_anchor_count + ' of the 30 fictional ' +
        'clients are anchored in this regime.';
    }
    regimeBody.append(contextLine);

    const detailToggle = el('button', 's03-detail-toggle',
      regimeDetailOpen ? 'Hide provenance & assumptions' : 'Show provenance & assumptions');
    detailToggle.type = 'button';
    detailToggle.setAttribute('aria-expanded', String(regimeDetailOpen));
    regimeBody.append(detailToggle);
    if (regimeDetailOpen) {
      const detail = el('div', 's03-detail');
      detail.append(
        row('Provenance', regime.provenance),
        row('Regime id (record)', regime.id),
        row('Anchor month / quarter',
          orMissing(regime.anchor_month) + ' / ' + orMissing(regime.anchor_quarter)),
        row('Assessment cutoff', orMissing(regime.assessment_cutoff)),
        row('Selection criterion', orMissing(regime.selection_criterion)),
        row('Macro snapshot', orMissing(regime.macro_snapshot_id)),
        row('Evidence type', orMissing(regime.evidence_type)),
        row('Vintage labels',
          regime.vintage_labels_carried.length
            ? regime.vintage_labels_carried.join(' · ')
            : orMissing(regime.vintage_label)));
      Object.keys(regime.explicitly_missing_series).forEach(series => {
        detail.append(row('Missing series: ' + series,
          regime.explicitly_missing_series[series],
          'missing stays missing — never zero-filled', true));
      });
      if (regime.authored_synthetic_parameters.length) {
        detail.append(row('Authored synthetic parameters',
          regime.authored_synthetic_parameters.length + ' series',
          'all macro numbers under this regime are authored synthetic ' +
          'parameters, NOT observed data'));
      }
      detail.append(row('Benchmark cases under this regime',
        String(regime.benchmark_cases) + ' (frozen 384-case population)'));
      detailToggle.addEventListener('click', () => {
        regimeDetailOpen = false; renderRegimes();
      });
      regimeBody.append(detail);
    } else {
      detailToggle.addEventListener('click', () => {
        regimeDetailOpen = true; renderRegimes();
      });
    }

    const macroGroup = group('Macro evidence (frozen record, integer x1000 series)',
      [chip(regime.macro.snapshot_id
        ? regime.macro.snapshot_id : 'no snapshot — authored', regime.macro.snapshot_id ? 'frozen' : 'authored')]);
    regime.macro.series.forEach(series => {
      const line = el('div', 's03-macro-row');
      line.append(el('span', null, series.series_id));
      const value = el('b', null,
        series.value === null || series.value === undefined
          ? NOT_MEASURED + ' — ' + orMissing(series.missing_data_status)
          : series.value + ' ' + orMissing(series.units));
      if (series.value === null || series.value === undefined) {
        value.classList.add('s03-muted');
      }
      line.append(value);
      line.append(el('small', null,
        'vintage: ' + orMissing(series.vintage) +
        (series.missing_data_status
          ? ' · ' + series.missing_data_status : '')));
      macroGroup.append(line);
    });
    macroGroup.append(el('p', 's03-note', profiles.macro_notices.fhfa_notice));
    regimeBody.append(macroGroup);

    const riskGroup = group('Risk implications (record values only)');
    riskGroup.append(
      row('Direction / severity', regime.direction + ' · ' + regime.severity + '/5'),
      row('Regime context role',
        'supplied deterministic context — interpretive, never a value input'));
    const list = el('ul', 's03-list');
    regime.prohibited_inferences.forEach(item => list.append(el('li', null, item)));
    riskGroup.append(el('strong', null, 'Prohibited inferences (verbatim)'), list);
    regimeBody.append(riskGroup);

    const separation = el('div', 's03-separation');
    separation.append(el('strong', null,
      'Credit decision — unchanged by regime selection'));
    if (client) {
      separation.append(el('span', null,
        client.client_id + ' committed record: ' + client.assessment.expected_status +
        ' · indicative capacity ' + fmtUsd(client.assessment.expected_capacity_cents) +
        ' · human review required. Scenario outputs stay scenario outputs.'));
    } else {
      separation.append(el('span', null,
        'No fictional client selected. Scenario outputs stay scenario outputs.'));
    }
    const inv = profiles.scenario_contract.regime_invariance;
    separation.append(el('span', null,
      'Frozen benchmark evidence (' + inv.source + '): ' + inv.groups + '/' +
      inv.groups + ' profile\u00d7portfolio\u00d7variant groups have identical ' +
      'deterministic outcomes across all six regimes (' +
      inv.groups_with_differing_outcomes_across_regimes + ' differ). No ' +
      'regime multiplier exists; none is invented.'));
    regimeBody.append(separation);

    const note = el('p', 's03-note',
      'Six regimes verbatim from the committed records (ids from the 384-case ' +
      'benchmark regime provenance). Non-equivalences: ' +
      profiles.non_equivalences.join(' · ') + '. Scenario contract: ' +
      profiles.scenario_contract.schema_version + ' — ' +
      profiles.scenario_contract.principle + '.');
    regimeBody.append(note);
  };

  /* ---------------- panel scaffolding & wiring ---------------- */
  const buildPanels = () => {
    const anchor = document.querySelector('.client-card');
    if (!anchor) return false;

    const charPanel = el('section', 's03-panel');
    charPanel.id = 's03-characteristics';
    charPanel.setAttribute('aria-label', 'Full synthetic client characteristics');
    const charHead = el('button', 's03-head');
    charHead.type = 'button';
    charHead.id = 's03-char-toggle';
    charHead.setAttribute('aria-expanded', 'false');
    charHead.setAttribute('aria-controls', 's03-char-body');
    const charHeadText = el('div');
    charHeadText.append(el('p', 'eyebrow', 'SPRINTVIS-S03 · CLIENT CHARACTERISTICS'));
    charHeadText.append(el('strong', null, 'Full client record — every available characteristic'));
    charHeadText.append(el('small', 's03-sub',
      'Synthetic fixture record · missing values explicit, never zero'));
    charHead.append(charHeadText);
    charHead.append(el('span', 's03-expand-label', 'Expand'));
    charBody = el('div', 's03-body');
    charBody.id = 's03-char-body';
    charBody.hidden = true;
    charHead.addEventListener('click', () => {
      const expanded = charHead.getAttribute('aria-expanded') === 'true';
      charHead.setAttribute('aria-expanded', String(!expanded));
      charBody.hidden = expanded;
      charHead.querySelector('.s03-expand-label').textContent =
        expanded ? 'Expand' : 'Collapse';
    });
    charPanel.append(charHead, charBody);
    anchor.insertAdjacentElement('afterend', charPanel);

    const regimePanel = el('section', 's03-panel');
    regimePanel.id = 's03-regimes';
    regimePanel.setAttribute('aria-label', 'Six economic regimes');
    const regimeHead = el('button', 's03-head');
    regimeHead.type = 'button';
    regimeHead.id = 's03-regime-toggle';
    regimeHead.setAttribute('aria-expanded', 'false');
    regimeHead.setAttribute('aria-controls', 's03-regime-body');
    const regimeHeadText = el('div');
    regimeHeadText.append(el('p', 'eyebrow', 'SPRINTVIS-S03 · ECONOMIC REGIMES'));
    regimeHeadText.append(el('strong', null, 'Six economic regimes — provenance & macro evidence'));
    regimeHeadText.append(el('small', 's03-sub',
      'Historical frozen snapshots vs authored-synthetic assumptions · regime selection never changes a credit decision'));
    regimeHead.append(regimeHeadText);
    regimeHead.append(el('span', 's03-expand-label', 'Expand'));
    regimeBody = el('div', 's03-body');
    regimeBody.id = 's03-regime-body';
    regimeBody.hidden = true;
    regimeHead.addEventListener('click', () => {
      const expanded = regimeHead.getAttribute('aria-expanded') === 'true';
      regimeHead.setAttribute('aria-expanded', String(!expanded));
      regimeBody.hidden = expanded;
      regimeHead.querySelector('.s03-expand-label').textContent =
        expanded ? 'Expand' : 'Collapse';
    });
    regimePanel.append(regimeHead, regimeBody);
    charPanel.insertAdjacentElement('afterend', regimePanel);
    return true;
  };

  const render = () => {
    currentClientId = clientIdFromDom();
    const client = currentClientId ? profiles.clients[currentClientId] : null;
    if (charBody) renderCharacteristics(client);
    if (regimeBody) renderRegimes();
  };

  const start = () => {
    profiles = window.THAL3S_CLIENTS30_PROFILES || null;
    if (!profiles || profiles.schema_version !== 'sprintvis-s03-profiles-v1' ||
        !profiles.clients || !profiles.regimes || profiles.regimes.length !== 6) {
      profiles = null;
    }
    if (!buildPanels()) return;
    if (!profiles) {
      const notice = el('div', 's03-unavailable',
        'Client characteristics and economic-regime panels unavailable: the ' +
        'generated profiles module did not load or failed its schema check. ' +
        'No values are shown (fail-closed; nothing invented).');
      charBody.append(notice);
      regimeBody.append(notice.cloneNode(true));
      return;
    }
    render();
    const observer = new MutationObserver(render);
    observer.observe(document.getElementById('property-address'),
      {childList: true, characterData: true, subtree: true});
  };

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = STYLESHEET_SRC;
  document.head.appendChild(link);
  const script = document.createElement('script');
  script.src = PROFILES_SRC;
  script.onload = start;
  script.onerror = start;
  document.head.appendChild(script);
})();
/* ==================== sprintvis-s03 END ==================== */

/* =====================================================================
   sprintvis-s02 BEGIN — additive block (SprintVis S02: illustrative
   property photography; P0 founder correction 2026-11-02: the selected
   cf30 client's verified-license illustrative photograph renders
   immediately INSIDE the recovered top-right Property Focus image box
   (#property-photo in #photo-frame), on the original deployment's own
   photo path; the separate SPRINTVIS-S02 photography panel and the
   retired sprintvis-s08 schematic-retirement note are removed (founder
   P0 directive items 1-3). ADDITIVE-ONLY vs the pristine recovered
   app: no original line above (nor any sprintvis-s03 line) is removed
   or changed. This block loads the generated module ./clients30-photos.js
   and the additive stylesheet ./photos-integration.css at runtime
   (index.html stays byte-pinned by the coordinator-owned recovery
   suites — no second script tag is added to index.html). Every image
   path, alt text, credit and license comes from S01's committed
   photography manifest through the generated module; photos are
   ILLUSTRATIVE PROPERTY PHOTOGRAPHY and never depict a fictional
   client's actual property. For a cf30 selection the aerial-schematic
   fallback is retired (#photo-fallback hidden — never the green
   schematic, never the retired schematic-retirement note), the founder-
   mandated visible illustrative label shows on the photo in the
   original deployment's own overlay component (.aerial-overlay), and
   the honest counter plus attribution (credit, rights status) sit
   in the recovered photo-meta row; the photograph, label, counter and
   attribution update together with the property record on every marker
   change (the original selection handler sets the record fields
   synchronously; this block observes the address and completes the
   presentation before the next paint — no layout shift, the recovered
   photo frame keeps its fixed CSS height and injected nodes are
   absolutely positioned inside it). Failure paths are fail-closed and
   explicit, never a silent substitute: payload-absent or an image load
   error renders an honest PHOTOGRAPH UNAVAILABLE state in the frame —
   no unrelated house, no substitute image, nothing invented. The five
   ORIGINAL demo properties (and the overview state) keep their
   recovered behavior byte-for-byte: this block removes only what it
   itself applied.
   ===================================================================== */
;(() => {
  const PHOTOS_SRC = './clients30-photos.js?v=h-series-private-review-20261102';
  const STYLESHEET_SRC = './photos-integration.css';
  const SCHEMA = 'sprintvis-s02-photos-v1';
  const ILLUSTRATIVE_LABEL = 'Illustrative property photograph \u2014 not the client\u2019s actual property.';
  const UNAVAILABLE_TITLE = 'PHOTOGRAPH UNAVAILABLE';
  const UNAVAILABLE_BODY =
    'Verified illustrative imagery for this property did not load. No ' +
    'substitute image is shown \u2014 nothing invented, nothing substituted.';

  const byId = id => document.getElementById(id);
  const el = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  };

  let photos = null;
  let frame = null;
  let photo = null;
  let fallback = null;
  let injected = null;
  let currentClientId = null;
  /* load stage guard: 0 idle, 1 primary photo set, 2 unavailable */
  let loadStage = 0;

  const clientIdFromDom = () => {
    const address = byId('property-address');
    const match = address && address.textContent.match(/cf30-\d{3}/);
    return match ? match[0] : null;
  };

  const clearInjected = () => {
    if (injected && injected.parentNode) {
      injected.parentNode.removeChild(injected);
    }
    injected = null;
  };

  const setText = (id, text) => {
    const node = byId(id);
    if (node) node.textContent = text;
  };

  const showPhoto = (clientId, entry) => {
    loadStage = 1;
    clearInjected();
    photo.src = entry.src;
    photo.hidden = false;
    fallback.hidden = true;
    fallback.style.setProperty('display', 'none', 'important');
    photo.alt = entry.alt_text;
    injected = el('div', 'aerial-overlay s02-photo-overlay');
    injected.append(el('strong', null, 'ILLUSTRATIVE CATEGORY ARTWORK'));
    injected.append(el('small', null, ILLUSTRATIVE_LABEL));
    frame.appendChild(injected);
    setText('photo-count', '1 original category illustration');
    setText('photo-source',
      'Illustration: ' + entry.credit + ' — fictional asset, not a real property photograph');
  };

  const showUnavailable = clientId => {
    loadStage = 2;
    clearInjected();
    photo.hidden = true;
    photo.removeAttribute('src');
    photo.alt = '';
    fallback.hidden = true;
    injected = el('div', 'aerial-overlay s02-photo-overlay');
    injected.append(el('strong', null, UNAVAILABLE_TITLE));
    injected.append(el('small', null, UNAVAILABLE_BODY));
    frame.appendChild(injected);
    setText('photo-count', 'no photograph shown \u00b7 none substituted');
    setText('photo-source', UNAVAILABLE_BODY);
  };

  const onImageError = () => {
    if (loadStage === 1 && currentClientId) {
      showUnavailable(currentClientId);
    }
  };

  const render = () => {
    if (!frame) return;
    const clientId = clientIdFromDom();
    currentClientId = clientId;
    frame.dataset.photoClientId = clientId || '';
    if (!clientId) {
      /* one of the five original demo properties (or overview): the
         recovered selection logic has already restored the photo/
         schematic state and the honest counter for that property —
         remove only what this block applied, keep the original
         byte-for-byte */
      loadStage = 0;
      clearInjected();
      return;
    }
    const entry = photos && photos.clients ? photos.clients[clientId] : null;
    if (entry) showPhoto(clientId, entry);
    else showUnavailable(clientId);
  };

  const start = () => {
    const payload = window.THAL3S_CLIENTS30_PHOTOS || null;
    photos = (payload && payload.schema_version === SCHEMA &&
              payload.clients && payload.fallbacks &&
              Object.keys(payload.clients).length === 30) ? payload : null;
    frame = byId('photo-frame');
    photo = byId('property-photo');
    fallback = byId('photo-fallback');
    const address = byId('property-address');
    if (!frame || !photo || !fallback || !address) return;
    photo.addEventListener('error', onImageError);
    const observer = new MutationObserver(render);
    observer.observe(address, {childList: true, characterData: true,
                               subtree: true});
    render();
  };

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = STYLESHEET_SRC;
  document.head.appendChild(link);
  const script = document.createElement('script');
  script.src = PHOTOS_SRC;
  script.onload = start;
  script.onerror = start;
  document.head.appendChild(script);
})();
/* ==================== sprintvis-s02 END ==================== */
