import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale
)

// Chart colors for consistent theming
export const chartColors = [
  '#1fb8cd', '#6366f1', '#10b981', '#f59e0b', '#ef4444', 
  '#8b5cf6', '#06b6d4', '#84cc16', '#f97316', '#ec4899'
]

// Maturity level colors
export const maturityColors: Record<string, string> = {
  'Level 1: Initial': '#dc2626',
  'Level 2: Managed': '#ea580c', 
  'Level 3: Defined': '#ca8a04',
  'Level 4: Quantitative': '#16a34a',
  'Level 5: Optimizing': '#059669'
}

// Default chart options with proper Chart.js types
export const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12,
          family: 'Inter',
          weight: 'normal' as const
        }
      }
    },
    tooltip: {
      backgroundColor: '#1f2937',
      titleColor: '#f9fafb',
      bodyColor: '#f9fafb',
      borderColor: '#374151',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true,
      titleFont: {
        size: 14,
        weight: 'bold' as const
      },
      bodyFont: {
        size: 13,
        weight: 'normal' as const
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#e5e7eb',
        drawBorder: false
      },
      ticks: {
        color: '#6b7280',
        font: {
          size: 12,
          family: 'Inter'
        }
      }
    },
    x: {
      grid: {
        display: false
      },
      ticks: {
        color: '#6b7280',
        font: {
          size: 12,
          family: 'Inter'
        }
      }
    }
  }
}

// Doughnut chart options with FIXED template literal
export const doughnutChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12,
          family: 'Inter'
        }
      }
    },
    tooltip: {
      backgroundColor: '#1f2937',
      titleColor: '#f9fafb',
      bodyColor: '#f9fafb',
      borderColor: '#374151',
      borderWidth: 1,
      cornerRadius: 8,
      callbacks: {
        label: function(context: any) {
          const label = context.label || ''
          const value = context.parsed || 0
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
          const percentage = ((value / total) * 100).toFixed(1)
          return `${label}: ${value} (${percentage}%)`
        }
      }
    }
  }
}

// Radar chart options
export const radarChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12,
          family: 'Inter'
        }
      }
    },
    tooltip: {
      backgroundColor: '#1f2937',
      titleColor: '#f9fafb',
      bodyColor: '#f9fafb',
      borderColor: '#374151',
      borderWidth: 1,
      cornerRadius: 8
    }
  },
  scales: {
    r: {
      beginAtZero: true,
      max: 10,
      grid: {
        color: '#e5e7eb'
      },
      angleLines: {
        color: '#e5e7eb'
      },
      pointLabels: {
        color: '#6b7280',
        font: {
          size: 11,
          family: 'Inter'
        }
      },
      ticks: {
        color: '#6b7280',
        backdropColor: 'transparent',
        font: {
          size: 10
        }
      }
    }
  }
}

// Helper function to create dataset with consistent styling
export const createDataset = (label: string, data: number[], colorIndex = 0) => ({
  label,
  data,
  backgroundColor: chartColors[colorIndex] + '20',
  borderColor: chartColors[colorIndex],
  borderWidth: 2,
  borderRadius: 4,
  tension: 0.4
})

// Helper function to get color by score
export const getScoreColor = (score: number): string => {
  if (score >= 8) return '#10b981'
  if (score >= 6) return '#f59e0b'  
  if (score >= 4) return '#ef4444'
  return '#dc2626'
}
