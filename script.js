// Add this to your existing script.js file

// Loading screen logic - show only once per session
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingPercentage = document.querySelector('.loading-percentage');
    
    // Check if user has already seen the loading screen in this session
    const hasSeenLoading = sessionStorage.getItem('hasSeenLoading');
    
    if (hasSeenLoading) {
        // User has already seen loading screen, hide it immediately
        loadingScreen.style.display = 'none';
        document.body.classList.add('loaded');
    } else {
        // First visit, show loading screen
        document.body.classList.add('loading');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                // Complete loading
                setTimeout(() => {
                    loadingProgress.style.width = '100%';
                    loadingPercentage.textContent = '100%';
                    
                    setTimeout(() => {
                        loadingScreen.classList.add('loading-complete');
                        document.body.classList.remove('loading');
                        document.body.classList.add('loaded');
                        
                        // Set flag in session storage to indicate loading has been seen
                        sessionStorage.setItem('hasSeenLoading', 'true');
                    }, 500);
                }, 300);
            } else {
                loadingProgress.style.width = `${progress}%`;
                loadingPercentage.textContent = `${Math.floor(progress)}%`;
            }
        }, 100);
    }
});

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll event listener for potential scroll-based animations
    window.addEventListener('scroll', () => {
        // You can add scroll-based animations here if needed
    });
    
    // Optional: Add a class to body when Spline is loaded
    const splineViewer = document.querySelector('spline-viewer');
    if (splineViewer) {
        splineViewer.addEventListener('load', () => {
            document.body.classList.add('spline-loaded');
        });
    }
});