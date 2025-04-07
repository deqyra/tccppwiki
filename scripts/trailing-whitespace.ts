import * as fs from "fs";
import * as path from "path";
import { minimatch } from "minimatch";

const IGNORE_FILE = ".prettierignore";
const DEFAULT_IGNORES = [".git"];
const ALLOWED_EXTENSIONS = ["mts", "scss", "svg", "json", "sh", "css", "sass", "html", "js", "md", "ts", "vue"];

function get_ignore_paths(): string[] {
    if (!fs.existsSync(IGNORE_FILE)) {
        return DEFAULT_IGNORES;
    }
    const content = fs.readFileSync(IGNORE_FILE, "utf-8");
    return [...DEFAULT_IGNORES, ...content.split("\n")];
}

function extension(path: string) {
    return path.split(".").pop();
}

function* walk(dir: string, ignores: string[]) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const file_path = path.join(dir, file);
        if (ignores.some(ignore => minimatch(file_path, ignore))) {
            continue;
        }
        const stats = fs.statSync(file_path);
        if (stats.isDirectory()) {
            yield* walk(file_path, ignores);
        } else if (stats.isFile()) {
            yield file_path;
        }
    }
}

function check_file(path: string, fix: boolean) {
    if (!ALLOWED_EXTENSIONS.includes(extension(path) as string)) {
        return;
    }
    const content = fs.readFileSync(path, "utf-8");
    const lines = content.split("\n");
    const whitespace_lines: number[] = [];
    for (const [i, line] of lines.entries()) {
        if (line.endsWith(" ") || line.endsWith("\t")) {
            whitespace_lines.push(i);
        }
    }
    if (whitespace_lines.length > 0) {
        console.log(`Trailing whitespace found: ${path}`);
        for (const line of whitespace_lines) {
            console.log(`  line ${line}`);
        }
        if (fix) {
            const fixed = lines.map(line => line.trimEnd()).join("\n");
            fs.writeFileSync(path, fixed, "utf-8");
            console.log(`Fixed: ${path}`);
        }
    }
}

function main() {
    console.log("Checking for trailing whitespace");
    const args = process.argv.slice(2);
    const fix_mode = args.includes("--fix");
    const paths = args.filter(arg => arg !== "--fix");
    const ignore_paths = get_ignore_paths();

    if (paths.length === 0) {
        for (const path of walk("./", ignore_paths)) {
            check_file(path, fix_mode);
        }
    } else {
        for (const path of paths) {
            check_file(path, fix_mode);
        }
    }
}

main();
