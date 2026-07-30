const fs = require('fs');
const path = require('path');

const dirsToMigrate = [
    'c:/Users/Laksh/Desktop/VITHUB/frontend/src/app/(dashboard)/canteens',
    'c:/Users/Laksh/Desktop/VITHUB/frontend/src/app/(dashboard)/events',
    'c:/Users/Laksh/Desktop/VITHUB/frontend/src/app/(dashboard)/maintenance',
    'c:/Users/Laksh/Desktop/VITHUB/frontend/src/app/(dashboard)/queues',
    'c:/Users/Laksh/Desktop/VITHUB/frontend/src/app/(dashboard)/shuttles',
    'c:/Users/Laksh/Desktop/VITHUB/frontend/src/components/canteens',
    'c:/Users/Laksh/Desktop/VITHUB/frontend/src/components/events',
    'c:/Users/Laksh/Desktop/VITHUB/frontend/src/components/maintenance',
    'c:/Users/Laksh/Desktop/VITHUB/frontend/src/components/queues',
    'c:/Users/Laksh/Desktop/VITHUB/frontend/src/components/shuttles',
    'c:/Users/Laksh/Desktop/VITHUB/frontend/src/components/shared'
];

const walk = (dir) => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const fullPath = path.join(dir, f);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (f.endsWith('.tsx') || f.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;

            // Map components/common to correct locations
            content = content.replace(/@\/components\/common\/app-shell/g, '@/components/layout/page-wrapper');
            content = content.replace(/AppShell/g, 'PageWrapper');
            
            content = content.replace(/@\/components\/common\/empty-state/g, '@/components/feedback/empty-state');
            content = content.replace(/@\/components\/common\/error-state/g, '@/components/feedback/error-state');
            content = content.replace(/@\/components\/common\/status-badge/g, '@/components/ui/status-badge');
            
            content = content.replace(/@\/components\/common\/page-header/g, '@/components/shared/page-header');
            content = content.replace(/@\/components\/common\/search-bar/g, '@/components/shared/search-bar');
            content = content.replace(/@\/components\/common\/info-row/g, '@/components/shared/info-row');
            content = content.replace(/@\/components\/common\/metric-card/g, '@/components/shared/metric-card');
            content = content.replace(/@\/components\/common\/skeleton-grid/g, '@/components/shared/skeleton-grid');
            content = content.replace(/@\/components\/common\/sort-select/g, '@/components/shared/sort-select');
            content = content.replace(/@\/components\/common\/filter-select/g, '@/components/shared/filter-select');
            content = content.replace(/@\/components\/common\/view-toggle/g, '@/components/shared/view-toggle');
            content = content.replace(/@\/components\/common\/back-link/g, '@/components/shared/back-link');

            // Fix Lucide icons imports if necessary (Lucide changed slightly, but usually it's fine)
            
            if (content !== original) {
                fs.writeFileSync(fullPath, content);
            }
        }
    }
};

dirsToMigrate.forEach(walk);
console.log('UI imports migrated successfully.');
