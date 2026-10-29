import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { DAILY_GOAL, ProductivityTrackerComponent } from './productivity-tracker';

describe('ProductivityTrackerComponent', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(window, 'alert').mockImplementation(() => undefined);
  });

  afterEach(() => vi.restoreAllMocks());

  async function createTracker() {
    const fixture = TestBed.createComponent(ProductivityTrackerComponent);
    await fixture.whenStable();
    return fixture;
  }

  it('reprend la progression enregistrée et calcule le message', async () => {
    localStorage.setItem('tasks', '2');
    const fixture = await createTracker();

    expect(DAILY_GOAL).toBe(5);
    expect(fixture.componentInstance.completedTasks()).toBe(2);
    expect(fixture.componentInstance.progressPercentage()).toBe(40);
    expect(fixture.componentInstance.message()).toBe('Continuez comme ça, vous y êtes presque !');
    expect(fixture.nativeElement.textContent).toContain('40 %');
    expect(window.alert).not.toHaveBeenCalled();
    fixture.destroy();
  });

  it('enregistre les ajouts et alerte une seule fois à l’objectif', async () => {
    localStorage.setItem('tasks', '4');
    const fixture = await createTracker();

    (fixture.nativeElement.querySelector('.add-button') as HTMLButtonElement).click();
    await fixture.whenStable();

    expect(fixture.componentInstance.completedTasks()).toBe(5);
    expect(fixture.componentInstance.progressPercentage()).toBe(100);
    expect(fixture.componentInstance.message()).toBe('Félicitations, objectif atteint ! 🚀');
    expect(localStorage.getItem('tasks')).toBe('5');
    expect(window.alert).toHaveBeenCalledExactlyOnceWith('Bravo, vous avez fini votre journée !');
    expect((fixture.nativeElement.querySelector('.add-button') as HTMLButtonElement).disabled).toBe(true);
    fixture.destroy();
  });

  it('réinitialise la progression et affiche le message initial', async () => {
    localStorage.setItem('tasks', '3');
    const fixture = await createTracker();

    (fixture.nativeElement.querySelector('.reset-button') as HTMLButtonElement).click();
    await fixture.whenStable();

    expect(fixture.componentInstance.completedTasks()).toBe(0);
    expect(fixture.componentInstance.progressPercentage()).toBe(0);
    expect(fixture.componentInstance.message()).toBe('Prêt à démarrer la journée ?');
    expect(localStorage.getItem('tasks')).toBe('0');
    fixture.destroy();
  });

  it('ne répète pas l’alerte après un rechargement avec l’objectif atteint', async () => {
    localStorage.setItem('tasks', '5');
    const fixture = await createTracker();

    expect(fixture.componentInstance.message()).toBe('Félicitations, objectif atteint ! 🚀');
    expect(window.alert).not.toHaveBeenCalled();
    fixture.destroy();
  });
});
