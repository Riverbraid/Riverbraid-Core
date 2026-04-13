import os
import matplotlib.pyplot as plt
import pandas as pd

def main():
    if not os.path.exists('runtime.csv'):
        print("❌ runtime.csv missing")
        return
    df = pd.read_csv('runtime.csv')
    plt.style.use('dark_background')
    plt.figure(figsize=(10, 6))
    plt.plot(df['cycle'], df['h_div'], color='#D4AF37', marker='o', label='H_div')
    plt.title('Riverbraid Go 44 Stationary Convergence')
    plt.xlabel('Cycle')
    plt.ylabel('Divergence')
    plt.savefig('convergence_plot.png')
    print("✅ convergence_plot.png generated.")

if __name__ == "__main__":
    main()
