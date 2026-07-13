// ===== TAG SELECTION =====
document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', () => {
        document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
    });
});

// ===== CLEAR FILTERS =====
document.querySelector('.clear-all').addEventListener('click', () => {
    document.querySelectorAll('select').forEach(s => s.selectedIndex = 0);
    document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
    document.querySelector('.tag').classList.add('active');
});

// ===== PAGINATION =====
document.querySelectorAll('.pagination button').forEach(btn => {
    btn.addEventListener('click', () => {
        if (!btn.querySelector('i')) {
            document.querySelectorAll('.pagination button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }
    });
});

// ===== MORE BUTTON =====
document.querySelectorAll('.more-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        alert('Trip options: View Details | Edit | Delete');
    });
});

// ===== SEARCH FUNCTIONALITY =====
const searchInput = document.getElementById('tripSearch');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('.trip-card').forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(query) ? 'flex' : 'none';
        });
    });
}

// ===== APPLY FILTERS =====
document.querySelector('.apply-filters-btn').addEventListener('click', () => {
    const statusFilter = document.getElementById('statusFilter').value;
    const activeTag = document.querySelector('.tag.active').dataset.filter;
    
    document.querySelectorAll('.trip-card').forEach(card => {
        const cardStatus = card.dataset.status;
        
        let showCard = true;
        
        if (statusFilter !== 'All Status' && cardStatus !== statusFilter.toLowerCase()) {
            showCard = false;
        }
        
        if (activeTag !== 'all' && cardStatus !== activeTag) {
            showCard = false;
        }
        
        card.style.display = showCard ? 'flex' : 'none';
    });
    
    // Update count
    const visibleCards = document.querySelectorAll('.trip-card[style="display: flex;"], .trip-card:not([style])').length;
    document.querySelector('.trips-header h3').textContent = `Your Trips (${visibleCards})`;
});

// ===== SORT FUNCTIONALITY =====
document.getElementById('sortFilter').addEventListener('change', (e) => {
    const sortBy = e.target.value;
    const tripsList = document.querySelector('.trips-list');
    const cards = Array.from(document.querySelectorAll('.trip-card'));
    
    cards.sort((a, b) => {
        if (sortBy === 'Highest Score') {
            const scoreA = parseInt(a.querySelector('.stat-value.score').textContent);
            const scoreB = parseInt(b.querySelector('.stat-value.score').textContent);
            return scoreB - scoreA;
        } else if (sortBy === 'Lowest Cost') {
            const costA = parseInt(a.querySelector('.stat-value.cost').textContent.replace(/[^0-9]/g, ''));
            const costB = parseInt(b.querySelector('.stat-value.cost').textContent.replace(/[^0-9]/g, ''));
            return costA - costB;
        }
        return 0;
    });
    
    cards.forEach(card => tripsList.appendChild(card));
});

console.log('✅ Trip History page JS loaded');