# Easing Functions Usage Guide

Practical examples and integration patterns for using easing functions in animations.

## Basic Animation Pattern

### Manual Animation Loop

```typescript
import { easeOutQuad } from '@rgsoft/easing';

function animateElement(
  element: HTMLElement,
  startValue: number,
  endValue: number,
  duration: number
) {
  const startTime = performance.now();
  
  function animate(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Apply easing function
    const easedProgress = easeOutQuad(progress);
    
    // Interpolate value
    const value = startValue + (endValue - startValue) * easedProgress;
    
    // Apply to element
    element.style.opacity = String(value);
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  
  requestAnimationFrame(animate);
}

// Usage
const box = document.getElementById('box') as HTMLElement;
animateElement(box, 0, 1, 1000);  // Fade in over 1 second
```

## Common Animation Scenarios

### Fade In/Out

```typescript
import { easeInOutQuad } from '@rgsoft/easing';

function fadeIn(element: HTMLElement, duration: number = 300) {
  animate(element, 'opacity', 0, 1, duration, easeInOutQuad);
}

function fadeOut(element: HTMLElement, duration: number = 300) {
  animate(element, 'opacity', 1, 0, duration, easeInOutQuad);
}

function animate(
  element: HTMLElement,
  property: string,
  start: number,
  end: number,
  duration: number,
  easing: (x: number) => number
) {
  const startTime = performance.now();
  
  function step(currentTime: number) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const easedProgress = easing(progress);
    const value = start + (end - start) * easedProgress;
    
    if (property === 'opacity') {
      element.style.opacity = String(value);
    }
    
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }
  
  requestAnimationFrame(step);
}
```

### Sliding/Position Animation

```typescript
import { easeOutCubic } from '@rgsoft/easing';

function slideDown(element: HTMLElement, distance: number, duration: number = 500) {
  const startY = element.offsetTop;
  const endY = startY + distance;
  
  animateProperty(element, 'top', startY, endY, duration, easeOutCubic, 'px');
}

function animateProperty(
  element: HTMLElement,
  property: string,
  start: number,
  end: number,
  duration: number,
  easing: (x: number) => number,
  unit: string = ''
) {
  const startTime = performance.now();
  
  function step(currentTime: number) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const easedProgress = easing(progress);
    const value = start + (end - start) * easedProgress;
    
    (element.style as any)[property] = `${value}${unit}`;
    
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }
  
  requestAnimationFrame(step);
}
```

### Scaling/Transform Animation

```typescript
import { easeOutElastic } from '@rgsoft/easing';

function scaleIn(element: HTMLElement, duration: number = 600) {
  const startTime = performance.now();
  
  function step(currentTime: number) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const scale = easeOutElastic(progress);
    
    element.style.transform = `scale(${scale})`;
    
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }
  
  requestAnimationFrame(step);
}
```

### Combined Property Animation

```typescript
import { easeInOutQuad } from '@rgsoft/easing';

interface AnimationProps {
  opacity?: [number, number];
  scale?: [number, number];
  translateX?: [number, number];
  translateY?: [number, number];
}

function animateMultiple(
  element: HTMLElement,
  props: AnimationProps,
  duration: number,
  easing: (x: number) => number
) {
  const startTime = performance.now();
  
  function step(currentTime: number) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const easedProgress = easing(progress);
    
    let transform = '';
    let opacity = 1;
    
    if (props.opacity) {
      const [start, end] = props.opacity;
      opacity = start + (end - start) * easedProgress;
      element.style.opacity = String(opacity);
    }
    
    if (props.scale) {
      const [start, end] = props.scale;
      const scale = start + (end - start) * easedProgress;
      transform += `scale(${scale}) `;
    }
    
    if (props.translateX) {
      const [start, end] = props.translateX;
      const x = start + (end - start) * easedProgress;
      transform += `translateX(${x}px) `;
    }
    
    if (props.translateY) {
      const [start, end] = props.translateY;
      const y = start + (end - start) * easedProgress;
      transform += `translateY(${y}px) `;
    }
    
    if (transform) {
      element.style.transform = transform;
    }
    
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }
  
  requestAnimationFrame(step);
}

// Usage
const element = document.getElementById('box') as HTMLElement;
animateMultiple(
  element,
  {
    opacity: [0, 1],
    scale: [0, 1],
    translateX: [-100, 0]
  },
  500,
  easeInOutQuad
);
```

## Animation Composition

### Sequence Multiple Animations

```typescript
import { easeOutQuad, easeInQuad } from '@rgsoft/easing';

async function sequenceAnimations(element: HTMLElement) {
  // Animate in
  await animateAsync(element, 'opacity', 0, 1, 500, easeOutQuad);
  
  // Wait
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Animate out
  await animateAsync(element, 'opacity', 1, 0, 500, easeInQuad);
}

function animateAsync(
  element: HTMLElement,
  property: string,
  start: number,
  end: number,
  duration: number,
  easing: (x: number) => number
): Promise<void> {
  return new Promise(resolve => {
    const startTime = performance.now();
    
    function step(currentTime: number) {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = easing(progress);
      const value = start + (end - start) * easedProgress;
      
      element.style[property as any] = String(value);
      
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    }
    
    requestAnimationFrame(step);
  });
}
```

### Parallel Animations

```typescript
function animateParallel(
  element: HTMLElement,
  animations: Array<{
    property: string;
    start: number;
    end: number;
    duration: number;
    easing: (x: number) => number;
  }>
): Promise<void> {
  return new Promise(resolve => {
    const startTime = performance.now();
    const maxDuration = Math.max(...animations.map(a => a.duration));
    
    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      
      for (const anim of animations) {
        const progress = Math.min(elapsed / anim.duration, 1);
        const easedProgress = anim.easing(progress);
        const value = anim.start + (anim.end - anim.start) * easedProgress;
        
        element.style[anim.property as any] = String(value);
      }
      
      if (elapsed < maxDuration) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    }
    
    requestAnimationFrame(step);
  });
}
```

## Advanced Patterns

### Reversible Animation

```typescript
import { easeInOutQuad } from '@rgsoft/easing';

class ReversibleAnimation {
  private isForward = true;
  private startTime = 0;
  private pausedTime = 0;
  private duration: number;
  
  constructor(
    private element: HTMLElement,
    private property: string,
    private startValue: number,
    private endValue: number,
    duration: number,
    private easing: (x: number) => number = easeInOutQuad
  ) {
    this.duration = duration;
  }
  
  play() {
    this.startTime = performance.now() - this.pausedTime;
    this.step();
  }
  
  reverse() {
    this.isForward = !this.isForward;
    const elapsed = performance.now() - this.startTime;
    this.pausedTime = this.duration - elapsed;
    this.startTime = performance.now() - this.pausedTime;
    this.step();
  }
  
  private step() {
    const elapsed = performance.now() - this.startTime;
    const progress = Math.min(elapsed / this.duration, 1);
    
    const easedProgress = this.isForward
      ? this.easing(progress)
      : 1 - this.easing(progress);
    
    const value = this.startValue + (this.endValue - this.startValue) * easedProgress;
    this.element.style[this.property as any] = String(value);
    
    if (progress < 1) {
      requestAnimationFrame(() => this.step());
    }
  }
}

// Usage
const anim = new ReversibleAnimation(
  element,
  'opacity',
  0,
  1,
  500,
  easeInOutQuad
);

anim.play();
// Later...
anim.reverse();
```

### Chained Ease Effects

```typescript
import { easeOutBounce, easeInSine } from '@rgsoft/easing';

function chainedEasing(
  progress: number,
  easings: Array<{ easing: (x: number) => number; weight: number }>
) {
  let totalWeight = 0;
  let value = 0;
  
  for (const { easing, weight } of easings) {
    value += easing(progress) * weight;
    totalWeight += weight;
  }
  
  return value / totalWeight;
}

// Usage: Combine bounce and sine for unique effect
const combined = chainedEasing(0.5, [
  { easing: easeOutBounce, weight: 0.7 },
  { easing: easeInSine, weight: 0.3 }
]);
```

### Smooth Value Change

```typescript
import { easeInOutQuad } from '@rgsoft/easing';

class SmoothValue {
  private currentValue: number;
  private targetValue: number;
  private startTime = 0;
  private duration: number;
  
  constructor(
    initialValue: number,
    duration: number = 300,
    private easing: (x: number) => number = easeInOutQuad
  ) {
    this.currentValue = initialValue;
    this.targetValue = initialValue;
    this.duration = duration;
  }
  
  animate(newTarget: number) {
    this.targetValue = newTarget;
    this.startTime = performance.now();
    this.update();
  }
  
  private update() {
    const elapsed = performance.now() - this.startTime;
    const progress = Math.min(elapsed / this.duration, 1);
    const easedProgress = this.easing(progress);
    
    this.currentValue = this.targetValue > this.currentValue
      ? this.currentValue + (this.targetValue - this.currentValue) * easedProgress
      : this.currentValue - (this.currentValue - this.targetValue) * easedProgress;
    
    if (progress < 1) {
      requestAnimationFrame(() => this.update());
    }
  }
  
  getValue(): number {
    return this.currentValue;
  }
}

// Usage
const smooth = new SmoothValue(0);
smooth.animate(100);
setInterval(() => console.log(smooth.getValue()), 16);
```

## Real-World Examples

### Modal Opening/Closing

```typescript
import { easeOutQuad, easeInQuad } from '@rgsoft/easing';

class Modal {
  constructor(private element: HTMLElement) {}
  
  open(duration: number = 300) {
    this.element.style.display = 'block';
    const backdrop = this.element.querySelector('.modal-backdrop') as HTMLElement;
    const content = this.element.querySelector('.modal-content') as HTMLElement;
    
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = easeOutQuad(progress);
      
      backdrop.style.opacity = String(eased * 0.5);
      content.style.transform = `scale(${eased * 0.8 + 0.2})`;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }
  
  close(duration: number = 300) {
    const backdrop = this.element.querySelector('.modal-backdrop') as HTMLElement;
    const content = this.element.querySelector('.modal-content') as HTMLElement;
    
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = easeInQuad(progress);
      
      backdrop.style.opacity = String((1 - eased) * 0.5);
      content.style.transform = `scale(${(1 - eased) * 0.8 + 0.2})`;
      
      if (progress >= 1) {
        this.element.style.display = 'none';
      } else {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }
}
```

### Progress Bar Animation

```typescript
import { easeOutExpo } from '@rgsoft/easing';

class ProgressBar {
  private currentProgress = 0;
  private targetProgress = 0;
  
  constructor(private element: HTMLElement) {}
  
  setProgress(target: number, duration: number = 500) {
    this.targetProgress = Math.min(Math.max(target, 0), 100);
    const startProgress = this.currentProgress;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = easeOutExpo(progress);
      
      this.currentProgress = startProgress + (this.targetProgress - startProgress) * eased;
      this.element.style.width = `${this.currentProgress}%`;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }
}
```

## Performance Tips

1. **Cache easing functions** — No need to recreate them
2. **Use `requestAnimationFrame`** — Syncs with browser refresh rate
3. **Combine properties** — Animate multiple properties in one loop
4. **Consider CSS animations** — For simple animations, CSS may be faster
5. **Limit animations** — Too many simultaneous animations can impact performance
6. **Use hardware acceleration** — Prefer `transform` and `opacity` over layout properties

## Browser Compatibility

All easing functions work in modern browsers. For older browser support:

```typescript
// Polyfill for requestAnimationFrame
if (typeof window.requestAnimationFrame === 'undefined') {
  window.requestAnimationFrame = (callback: FrameRequestCallback) => {
    return setTimeout(callback, 1000 / 60);
  };
}
```
