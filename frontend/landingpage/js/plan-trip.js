// ===== LEAFLET MAP INITIALIZATION =====
let routeMap;
let routeLayer;

function initMap() {
    // Kathmandu: 27.7172, 85.3240 | Pokhara: 28.2096, 83.9856
    const kathmandu = [27.7172, 85.3240];
    const pokhara = [28.2096, 83.9856];

    routeMap = L.map('routeMap', {
        zoomControl: false
    }).setView([27.95, 84.65], 8);

    // Add zoom control to top-right
    L.control.zoom({ position: 'topright' }).addTo(routeMap);

    // OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(routeMap);

    // Custom markers
    const fromIcon = L.divIcon({
        html: '<div style="background:#e74c3c;color:white;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);"><i class="fas fa-map-marker-alt"></i></div>',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        className: 'custom-marker'
    });

    const toIcon = L.divIcon({
        html: '<div style="background:#2d8a5e;color:white;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);"><i class="fas fa-map-marker-alt"></i></div>',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        className: 'custom-marker'
    });

    L.marker(kathmandu, { icon: toIcon }).addTo(routeMap).bindPopup('<b>Kathmandu</b><br>Starting Point');
    L.marker(pokhara, { icon: fromIcon }).addTo(routeMap).bindPopup('<b>Pokhara</b><br>Destination');

    // Draw route line (simplified polyline)
    const routePoints = [
        kathmandu,
        [27.85, 85.10],
        [27.95, 84.80],
        [28.05, 84.50],
        [28.15, 84.20],
        pokhara
    ];

    routeLayer = L.polyline(routePoints, {
        color: '#2d8a5e',
        weight: 4,
        opacity: 0.8,
        smoothFactor: 1
    }).addTo(routeMap);

    // Fit bounds
    routeMap.fitBounds(routeLayer.getBounds(), { padding: [30, 30] });
}

// Initialize map on load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initMap, 100);
});

// ===== SWAP LOCATIONS =====
document.getElementById('swapBtn')?.addEventListener('click', () => {
    const from = document.getElementById('fromLocation');
    const to = document.getElementById('toLocation');
    const temp = from.value;
    from.value = to.value;
    to.value = temp;
});

// ===== ANALYZE TRIP =====
document.getElementById('analyzeBtn')?.addEventListener('click', () => {
    const btn = document.getElementById('analyzeBtn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';

    // Simulate AI analysis
    setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-magic"></i> Analyze My Trip';
        
        // Update results
        updateResults();
        
        // Scroll to results
        document.querySelector('.results-column').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }, 2000);
});

function updateResults() {
    // Animate score circle
    const score = 82;
    const circumference = 2 * Math.PI * 42;
    const offset = circumference - (score / 100) * circumference;
    
    const progressCircle = document.querySelector('.score-circle .progress');
    if (progressCircle) {
        progressCircle.style.strokeDasharray = circumference;
        progressCircle.style.strokeDashoffset = circumference;
        
        setTimeout(() => {
            progressCircle.style.strokeDashoffset = offset;
        }, 100);
    }

    // Draw cost chart
    drawCostChart();
}

// ===== COST CHART =====
function drawCostChart() {
    const ctx = document.getElementById('costChart');
    if (!ctx) return;

    // Destroy existing chart if any
    if (window.costChartInstance) {
        window.costChartInstance.destroy();
    }

    window.costChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Fuel', 'Food', 'Accommodation', 'Miscellaneous'],
            datasets: [{
                data: [6800, 4500, 5000, 2200],
                backgroundColor: ['#2d8a5e', '#f5a623', '#1976d2', '#999'],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: false,
            cutout: '70%',
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': NPR ' + context.parsed.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// ===== VIEW ON MAP =====
document.getElementById('viewMapBtn')?.addEventListener('click', () => {
    window.open('https://www.openstreetmap.org/directions?from=27.7172,85.3240&to=28.2096,83.9856', '_blank');
});

// ===== FORM VALIDATION =====
document.querySelectorAll('.input-with-icon input, .input-with-icon select').forEach(input => {
    input.addEventListener('change', () => {
        input.style.borderColor = '#2d8a5e';
        setTimeout(() => {
            input.style.borderColor = '#ddd';
        }, 1000);
    });
});

console.log('✅ Plan Trip page JS loaded');