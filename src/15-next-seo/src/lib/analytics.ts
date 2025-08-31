// lib/analytics.ts
export function reportWebVitals(metric: any) {
  if (process.env.NODE_ENV === 'production') {
    // Google Analytics 4로 Web Vitals 데이터 전송
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', metric.name, {
        custom_map: {
          metric_id: 'custom_metric_id',
        },
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
      });
    }
    
    // 콘솔에서 성능 지표 확인 (개발 시에만)
    console.log('Web Vitals:', metric);
  }
}

// app/layout.tsx에서 사용
// export { reportWebVitals } from '@/lib/analytics';