import { Breadcrumb } from "../types";

// filepath: d:/002-Proyects/laravel/ecomerce/resources/js/helpers/breadcrumbs.ts

export class BreadcrumbsManager {
  private items: Breadcrumb[];

  constructor(initial: Breadcrumb[] = []) {
    this.items = [...initial];
  }

  add(label: string, href?: string) {
    this.items.push({ label, href });
    return this;
  }

  push(b: Breadcrumb) {
    this.items.push(b);
    return this;
  }

  prepend(label: string, href?: string) {
    this.items.unshift({ label, href });
    return this;
  }

  pop() {
    this.items.pop();
    return this;
  }

  replaceLast(label: string, href?: string) {
    if (this.items.length === 0) {
      this.add(label, href);
    } else {
      this.items[this.items.length - 1] = { label, href };
    }
    return this;
  }

  clear() {
    this.items = [];
    return this;
  }

  toArray(): Breadcrumb[] {
    return [...this.items];
  }

  get length() {
    return this.items.length;
  }

  get last() {
    return this.items[this.items.length - 1] ?? null;
  }
}

export function createBreadcrumbs(initial?: Breadcrumb[]) {
  return new BreadcrumbsManager(initial);
}

// Utility to quickly build an array without needing the manager
export function buildBreadcrumbs(...items: Breadcrumb[]) {
  return [...items];
}