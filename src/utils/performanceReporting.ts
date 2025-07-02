// Phase 4: Performance Reporting & Dashboard System

import { performanceAnalytics } from './performanceAnalytics';

interface ReportingConfig {
  enableAutoReporting: boolean;
  reportingInterval: number; // in milliseconds
  enableConsoleReports: boolean;
  enableLocalStorage: boolean;
  maxStoredReports: number;
}

class PerformanceReporting {
  private config: ReportingConfig = {
    enableAutoReporting: true,
    reportingInterval: 5 * 60 * 1000, // 5 minutes
    enableConsoleReports: true,
    enableLocalStorage: true,
    maxStoredReports: 50
  };
  
  private reportingInterval: NodeJS.Timeout | null = null;

  // Initialize reporting system
  initialize(config?: Partial<ReportingConfig>): void {
    if (config) {
      this.config = { ...this.config, ...config };
    }

    console.log('📋 Phase 4: Initializing performance reporting system...');

    if (this.config.enableAutoReporting) {
      this.startAutoReporting();
    }

    // Load historical reports
    this.loadStoredReports();
  }

  // Start automatic reporting
  private startAutoReporting(): void {
    this.reportingInterval = setInterval(() => {
      this.generateAndStoreReport();
    }, this.config.reportingInterval);
  }

  // Generate and store performance report
  private generateAndStoreReport(): void {
    const report = performanceAnalytics.generatePerformanceReport();
    
    if (this.config.enableConsoleReports) {
      this.logReportToConsole(report);
    }

    if (this.config.enableLocalStorage) {
      this.storeReportLocally(report);
    }
  }

  // Log detailed report to console
  private logReportToConsole(report: any): void {
    console.group(`📊 Performance Report - ${new Date(report.timestamp).toLocaleTimeString()}`);
    
    console.log(`🎯 Overall Score: ${report.summary.overallScore}/100 (Grade: ${report.summary.performanceGrade})`);
    
    if (report.summary.criticalIssues > 0) {
      console.warn(`⚠️ Critical Issues: ${report.summary.criticalIssues}`);
    }

    console.log('📈 Core Web Vitals:');
    Object.entries(report.metrics.coreWebVitals).forEach(([metric, data]: [string, any]) => {
      const status = data.status === 'good' ? '✅' : data.status === 'needs-improvement' ? '⚠️' : '❌';
      console.log(`  ${status} ${metric.toUpperCase()}: ${data.value.toFixed(0)}ms (Score: ${data.score}/100)`);
    });

    if (report.insights.length > 0) {
      console.log('💡 Recent Insights:');
      report.insights.forEach((insight: any) => {
        const icon = insight.severity === 'critical' ? '🚨' : insight.severity === 'warning' ? '⚠️' : 'ℹ️';
        console.log(`  ${icon} ${insight.title}: ${insight.description}`);
      });
    }

    console.log(`📊 Trend: ${report.trends.direction} (${report.trends.changePercent.toFixed(1)}% change)`);
    
    console.groupEnd();
  }

  // Store report in localStorage
  private storeReportLocally(report: any): void {
    try {
      const stored = localStorage.getItem('mylli-performance-reports');
      let reports = stored ? JSON.parse(stored) : [];
      
      reports.push(report);
      
      // Keep only the most recent reports
      if (reports.length > this.config.maxStoredReports) {
        reports = reports.slice(-this.config.maxStoredReports);
      }
      
      localStorage.setItem('mylli-performance-reports', JSON.stringify(reports));
    } catch (error) {
      console.warn('Failed to store performance report:', error);
    }
  }

  // Load stored reports
  private loadStoredReports(): any[] {
    try {
      const stored = localStorage.getItem('mylli-performance-reports');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.warn('Failed to load stored reports:', error);
      return [];
    }
  }

  // Generate summary dashboard data
  generateDashboard(): any {
    const latestReport = performanceAnalytics.getLatestReport();
    const criticalInsights = performanceAnalytics.getCriticalInsights();
    const allInsights = performanceAnalytics.getInsights();

    return {
      currentPerformance: latestReport ? {
        score: latestReport.summary.overallScore,
        grade: latestReport.summary.performanceGrade,
        trend: latestReport.trends.direction
      } : null,
      
      criticalIssues: criticalInsights.length,
      
      topIssues: criticalInsights.slice(0, 5).map(insight => ({
        title: insight.title,
        category: insight.category,
        impact: insight.impact,
        recommendation: insight.recommendation
      })),
      
      insights: {
        total: allInsights.length,
        byCategory: {
          performance: allInsights.filter(i => i.category === 'performance').length,
          memory: allInsights.filter(i => i.category === 'memory').length,
          network: allInsights.filter(i => i.category === 'network').length,
          userExperience: allInsights.filter(i => i.category === 'user-experience').length
        }
      },
      
      recommendations: this.generateActionableRecommendations(criticalInsights)
    };
  }

  // Generate actionable recommendations
  private generateActionableRecommendations(criticalInsights: any[]): string[] {
    const recommendations = new Set<string>();
    
    criticalInsights.forEach(insight => {
      recommendations.add(insight.recommendation);
    });

    // Add general recommendations based on patterns
    if (criticalInsights.some(i => i.category === 'memory')) {
      recommendations.add('Consider implementing memory optimization strategies');
    }
    
    if (criticalInsights.some(i => i.category === 'performance')) {
      recommendations.add('Review and optimize critical rendering path');
    }

    return Array.from(recommendations).slice(0, 5);
  }

  // Export reports for external analysis
  exportReports(): string {
    const reports = this.loadStoredReports();
    return JSON.stringify(reports, null, 2);
  }

  // Get performance summary for display
  getPerformanceSummary(): any {
    const dashboard = this.generateDashboard();
    
    return {
      score: dashboard.currentPerformance?.score || 0,
      grade: dashboard.currentPerformance?.grade || 'F',
      criticalIssues: dashboard.criticalIssues,
      status: dashboard.criticalIssues === 0 ? 'healthy' : dashboard.criticalIssues < 3 ? 'warning' : 'critical'
    };
  }

  // Cleanup
  destroy(): void {
    if (this.reportingInterval) {
      clearInterval(this.reportingInterval);
      this.reportingInterval = null;
    }
  }
}

export const performanceReporting = new PerformanceReporting();
