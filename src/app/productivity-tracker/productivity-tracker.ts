import { Component, computed, effect, signal } from '@angular/core';

export const DAILY_GOAL = 5;

@Component({
  selector: 'app-productivity-tracker',
  templateUrl: './productivity-tracker.html',
  styleUrl: './productivity-tracker.css',
})
export class ProductivityTrackerComponent {
  readonly dailyGoal = DAILY_GOAL;
  readonly taskSlots = [1, 2, 3, 4, 5];
  readonly completedTasks = signal(this.readStoredTasks());
  readonly progressPercentage = computed(() => (this.completedTasks() / DAILY_GOAL) * 100);
  readonly message = computed(() => {
    const progress = this.progressPercentage();
    if (progress === 0) return 'Prêt à démarrer la journée ?';
    if (progress < 100) return 'Continuez comme ça, vous y êtes presque !';
    return 'Félicitations, objectif atteint ! 🚀';
  });

  private previousTasks = this.completedTasks();

  constructor() {
    effect(() => {
      const count = this.completedTasks();
      localStorage.setItem('tasks', String(count));
      if (count >= DAILY_GOAL && this.previousTasks < DAILY_GOAL) {
        window.alert('Bravo, vous avez fini votre journée !');
      }
      this.previousTasks = count;
    });
  }

  addTask(): void {
    this.completedTasks.update((count) => Math.min(count + 1, DAILY_GOAL));
  }

  reset(): void {
    this.completedTasks.set(0);
  }

  private readStoredTasks(): number {
    const storedValue = Number(localStorage.getItem('tasks'));
    return Number.isFinite(storedValue) && storedValue > 0 ? Math.floor(storedValue) : 0;
  }
}
