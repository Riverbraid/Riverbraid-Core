import pandas as pd
import matplotlib.pyplot as plt
import os

def generate_plots():
    if not os.path.exists('runtime.csv'):
        print("❌ Error: runtime.csv not found.")
        return
    try:
        df = pd.read_csv('runtime.csv')
        plt.style.use('dark_background')
        color_gold = '#D4AF37'
        color_bone = '#E3DAC9'
        
        fig, ax1 = plt.subplots(figsize=(10, 6))
        ax1.set_xlabel('Verification Cycle (n)')
        ax1.set_ylabel('Harmonic Divergence (H_div)', color=color_gold)
        ax1.plot(df['cycle'], df['h_div'], color=color_gold, linewidth=2, marker='o')
        ax1.tick_params(axis='y', labelcolor=color_gold)
        ax1.grid(alpha=0.1)

        ax2 = ax1.twinx()
        ax2.set_ylabel('Verification Speed (ms)', color=color_bone)
        ax2.plot(df['cycle'], df['speed_ms'], color=color_bone, linestyle='--', alpha=0.7)
        ax2.tick_params(axis='y', labelcolor=color_bone)

        plt.title('Riverbraid Go 44: Convergence to Stationary State', color=color_bone, pad=20)
        fig.tight_layout()
        plt.savefig('convergence_plot.png', dpi=300)
        print("✅ convergence_plot.png generated.")
    except Exception as e:
        print(f"❌ Plotting failed: {e}")

if __name__ == "__main__":
    generate_plots()
