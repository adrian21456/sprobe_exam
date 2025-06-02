function colorVariants({ base = 500, hover = false, divisor1 = 10, divisor2 = 30 }: { base?: number, hover?: boolean, divisor1?: number, divisor2?: number }) {
    const colorList = [
        "blue",
        "red",
        "green",
        "yellow",
        "purple",
        "pink",
        "indigo",
        "teal",
        "orange",
        "cyan",
        "lime",
        "amber",
    ];

    let colorVariants: Record<string, string[]> = {};

    if (hover) {
        colorVariants = Object.fromEntries(
            colorList.map((color) => [
                color,
                [
                    `bg-${color}-${base}/${divisor1}`,
                    `hover:bg-${color}-${base}/${divisor2}`,
                ],
            ])
        );
    } else {
        colorVariants = Object.fromEntries(
            colorList.map((color) => [
                color,
                [
                    `bg-${color}-${base}/${divisor1}`,
                ],
            ])
        );
    }

    return colorVariants;
}


// Tailwind base colors (500 shades)
const baseColors: Record<string, string> = {
    green: "oklch(73.6% 0.202 142.1)", // Tailwind green-500
    red: "oklch(62.9% 0.233 27.7)",    // red-500
    blue: "oklch(62.3% 0.214 259.815)", // blue-500
    yellow: "oklch(83.5% 0.22 98.9)",
    purple: "oklch(68.7% 0.206 296.1)",
    pink: "oklch(70.3% 0.212 19.8)",
    indigo: "oklch(56.9% 0.169 270.9)",
    teal: "oklch(69.2% 0.175 191.4)",
    orange: "oklch(70.4% 0.233 65.7)",
    cyan: "oklch(71.8% 0.175 222.2)",
    lime: "oklch(80.1% 0.219 116.2)",
    amber: "oklch(75.2% 0.232 82.6)",
};

// Main function — accepts Tailwind-like shade/opacity string, e.g. "500/10"
function getColor(color: string, opacity: number = 10): any {
    return `color-mix(in oklab, var(--color-${color}-500) ${opacity}%, transparent)`
}

export { getColor, colorVariants };
export default colorVariants;