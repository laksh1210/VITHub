const fs = require('fs');
const path = require('path');
const servicesDir = 'c:/Users/Laksh/Desktop/VITHUB/frontend/src/services';
const hooksDir = 'c:/Users/Laksh/Desktop/VITHUB/frontend/src/hooks/api';
const typesDir = 'c:/Users/Laksh/Desktop/VITHUB/frontend/src/types';

const transformService = (file) => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/import \{ apiClient, unwrap \} from "\.\/client";/, 'import { BaseService } from "./core/base.service";');
    content = content.replace(/import type \{ ApiResponse \} from "@\/lib\/types\/common";\n?/, '');
    
    // Fix type imports to point to @/types/
    content = content.replace(/@\/lib\/types\//g, '@/types/');
    
    // Match export const nameApi = {
    const match = content.match(/export const (\w+)Api = \{/);
    if (!match) return;
    const camelName = match[1];
    const className = camelName.charAt(0).toUpperCase() + camelName.slice(1) + 'Service';
    
    let newContent = content.replace(/export const \w+Api = \{/, `class ${className} extends BaseService {\n  constructor() {\n    super("");\n  }`);
    
    // Replace unwrap(apiClient.get(...))
    newContent = newContent.replace(/(\w+):\s*\((.*?)\):\s*Promise<(.*?)>\s*=>\s*unwrap\(\s*apiClient\.get<ApiResponse<.*?>>\((.*?)\)\s*\),?/gs, 
        (match, name, args, retType, getArgs) => {
            return `public async ${name}(${args}): Promise<${retType}> {\n    return this.get<${retType}>(${getArgs});\n  }`;
        }
    );
    
    // Replace the closing brace
    newContent = newContent.replace(/\};\s*$/, `}\n\nexport const ${camelName}Service = new ${className}();\n`);
    
    fs.writeFileSync(file, newContent);
};

fs.readdirSync(servicesDir).forEach(f => {
    if(f.endsWith('.service.ts') && f !== 'dashboard.service.ts' && f !== 'core') {
        transformService(path.join(servicesDir, f));
    }
});

// Hooks transformation
const transformHook = (file) => {
    let content = fs.readFileSync(file, 'utf8');
    // Fix type imports
    content = content.replace(/@\/lib\/types\//g, '@/types/');
    content = content.replace(/@\/lib\/query-keys/g, '@/lib/query/query-keys');
    
    // Replace api imports
    content = content.replace(/import \{ (\w+)Api \} from "@\/lib\/api\/(\w+)";/g, 'import { $1Service } from "@/services/$2.service";');
    
    // Replace Api calls with Service calls
    content = content.replace(/(\w+)Api\./g, '$1Service.');
    
    fs.writeFileSync(file, content);
};

fs.readdirSync(hooksDir).forEach(f => {
    if(f.startsWith('use-') && !f.includes('api-query')) {
        transformHook(path.join(hooksDir, f));
    }
});

// Types transformation (Fixing imports inside types)
const transformTypes = (dir) => {
    fs.readdirSync(dir).forEach(f => {
        const fullPath = path.join(dir, f);
        if (fs.statSync(fullPath).isDirectory()) {
            transformTypes(fullPath);
        } else if(f.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            content = content.replace(/@\/lib\/types\//g, '@/types/');
            fs.writeFileSync(fullPath, content);
        }
    });
};
transformTypes(typesDir);

console.log('Services, Hooks, and Types transformed!');
