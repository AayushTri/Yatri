// ===== BUDGET SLIDER =====
const budgetSlider = document.getElementById('budgetSlider');
const budgetValue = document.getElementById('budgetValue');

if (budgetSlider && budgetValue) {
    budgetSlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        budgetValue.textContent = value >= 50000 ? '50,000+' : value.toLocaleString();
    });
}

// ===== INTEREST TAGS =====
document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', () => {
        tag.classList.toggle('active');
    });
});

// ===== VIEW TOGGLE =====
const gridView = document.getElementById('gridView');
const listView = document.getElementById('listView');
const destinationsGrid = document.getElementById('destinationsGrid');

if (gridView && listView && destinationsGrid) {
    gridView.addEventListener('click', () => {
        gridView.classList.add('active');
        listView.classList.remove('active');
        destinationsGrid.classList.remove('list-view');
    });

    listView.addEventListener('click', () => {
        listView.classList.add('active');
        gridView.classList.remove('active');
        destinationsGrid.classList.add('list-view');
    });
}

// ===== CLEAR ALL FILTERS =====
document.getElementById('clearAll')?.addEventListener('click', () => {
    document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
    document.getElementById('regionFilter').selectedIndex = 0;
    document.getElementById('seasonFilter').selectedIndex = 0;
    budgetSlider.value = 25000;
    budgetValue.textContent = '25,000';
    document.getElementById('destSearch').value = '';
    showAllDestinations();
});

// ===== APPLY FILTERS =====
document.getElementById('applyFilters')?.addEventListener('click', applyFilters);

function applyFilters() {
    const region = document.getElementById('regionFilter').value;
    const season = document.getElementById('seasonFilter').value;
    const maxBudget = parseInt(budgetSlider.value);
    const activeInterests = Array.from(document.querySelectorAll('.tag.active')).map(t => t.dataset.interest);
    const searchTerm = document.getElementById('destSearch').value.toLowerCase();

    const cards = document.querySelectorAll('.dest-card');
    let visibleCount = 0;

    cards.forEach(card => {
        const cardRegion = card.dataset.region;
        const cardInterest = card.dataset.interest;
        const cardCost = parseInt(card.dataset.cost);

        let show = true;

        if (region !== 'All Regions' && cardRegion !== region.toLowerCase()) show = false;
        if (activeInterests.length > 0 && !activeInterests.includes(cardInterest)) show = false;
        if (cardCost > maxBudget) show = false;
        
        const cardText = card.textContent.toLowerCase();
        if (searchTerm && !cardText.includes(searchTerm)) show = false;

        card.style.display = show ? 'block' : 'none';
        if (show) visibleCount++;
    });

    document.getElementById('destCount').textContent = `${visibleCount} destination${visibleCount !== 1 ? 's' : ''} found`;
}

function showAllDestinations() {
    document.querySelectorAll('.dest-card').forEach(card => {
        card.style.display = 'block';
    });
    document.getElementById('destCount').textContent = '48 destinations found';
}

// ===== SEARCH =====
document.getElementById('searchBtn')?.addEventListener('click', applyFilters);
document.getElementById('destSearch')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') applyFilters();
});

// ===== SORT =====
document.getElementById('sortSelect')?.addEventListener('change', (e) => {
    const sortBy = e.target.value;
    const grid = document.getElementById('destinationsGrid');
    const cards = Array.from(grid.querySelectorAll('.dest-card'));

    cards.sort((a, b) => {
        if (sortBy.includes('Rating')) {
            return parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating);
        } else if (sortBy.includes('Low to High')) {
            return parseInt(a.dataset.cost) - parseInt(b.dataset.cost);
        } else if (sortBy.includes('High to Low')) {
            return parseInt(b.dataset.cost) - parseInt(a.dataset.cost);
        }
        return 0;
    });

    cards.forEach(card => grid.appendChild(card));
});

console.log('✅ Destinations page JS loaded');