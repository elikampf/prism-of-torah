// Search functionality for podcast episodes

class PodcastSearch {
    constructor() {
        this.searchInput = document.querySelector('#episode-search');
        this.searchResults = document.querySelector('#search-results-content');
        this.noResults = document.querySelector('#no-results');
        this.searchResultsSection = document.querySelector('#search-results');
        this.closeSearch = document.querySelector('#close-search');
        this.clearSearch = document.querySelector('#clear-search');
        this.searchButton = document.querySelector('#search-button');
        this.episodes = [];
        this.init();
    }

    init() {
        if (!this.searchInput || !this.searchResults) return;
        
        // Get episodes from embedded data
        this.episodes = this.getAllEpisodes();
        
        // Add event listeners
        this.searchInput.addEventListener('input', this.handleSearch.bind(this));
        this.searchInput.addEventListener('keypress', this.handleKeyPress.bind(this));
        this.closeSearch?.addEventListener('click', this.hideSearchResults.bind(this));
        this.clearSearch?.addEventListener('click', this.clearSearchInput.bind(this));
        this.searchButton?.addEventListener('click', this.handleSearchButton.bind(this));
    }

    getAllEpisodes() {
        const episodes = [];
        for (const sefer in window.podcastData) {
            for (const parsha in window.podcastData[sefer]) {
                episodes.push(...window.podcastData[sefer][parsha].map(episode => ({
                    ...episode,
                    sefer,
                    parsha
                })));
            }
        }
        return episodes;
    }

    handleSearch(e) {
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 2) {
            this.hideSearchResults();
            return;
        }

        const results = this.episodes.filter(episode => 
            episode.title.toLowerCase().includes(query)
        );

        this.displayResults(results, query);
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.handleSearchButton();
        }
    }

    handleSearchButton() {
        const query = this.searchInput.value.toLowerCase().trim();
        if (query.length < 2) return;
        
        const results = this.episodes.filter(episode => 
            episode.title.toLowerCase().includes(query)
        );

        this.displayResults(results, query);
    }

    clearSearchInput() {
        this.searchInput.value = '';
        this.hideSearchResults();
        this.searchInput.focus();
    }

    hideSearchResults() {
        this.searchResultsSection.style.display = 'none';
        this.searchInput.value = '';
        this.clearSearch.style.display = 'none';
    }

    displayResults(results, query) {
        if (results.length === 0) {
            this.noResults.style.display = 'block';
            this.searchResults.innerHTML = '';
        } else {
            this.noResults.style.display = 'none';
            const html = results.map(episode => `
                <div class="search-result">
                    <a href="${episode.link}" target="_blank" onclick="window.trackEpisodeClick('${episode.title}', '${episode.link}')">
                        <h4>${episode.title}</h4>
                        <p class="episode-meta">${episode.sefer} • ${episode.parsha}</p>
                    </a>
                </div>
            `).join('');
            this.searchResults.innerHTML = html;
        }

        this.searchResultsSection.style.display = 'block';
        this.clearSearch.style.display = 'block';
        window.trackSearch(query);
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PodcastSearch();
}); 