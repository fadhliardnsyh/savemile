import { revalidatePath } from 'next/cache';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  TypeWithID,
} from 'payload';

function isBuildOrScript(): boolean {
  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) return true;
  if (process.env.IS_SEEDING === 'true' || process.env.PAYLOAD_MIGRATING === 'true') return true;
  return false;
}

export function revalidatePathSafely(path: string, type?: 'layout' | 'page'): void {
  if (isBuildOrScript()) return;
  try {
    revalidatePath(path, type);
  } catch (err) {
    console.error(`Failed to revalidate path "${path}":`, err);
  }
}

type PathResolver<T extends TypeWithID = TypeWithID> =
  | string
  | string[]
  | ((doc: T) => string | string[]);

export function revalidateGlobal(path: string, type?: 'layout' | 'page'): GlobalAfterChangeHook {
  return () => {
    revalidatePathSafely(path, type);
  };
}

export function revalidateCollection<T extends TypeWithID = TypeWithID>(
  resolver: PathResolver<T>,
  type?: 'layout' | 'page'
): CollectionAfterChangeHook<T> & CollectionAfterDeleteHook<T> {
  return ({ doc }) => {
    if (typeof resolver === 'function') {
      const paths = resolver(doc);
      if (Array.isArray(paths)) {
        paths.forEach((p) => {
          revalidatePathSafely(p, type);
        });
      } else if (paths) {
        revalidatePathSafely(paths, type);
      }
    } else if (Array.isArray(resolver)) {
      resolver.forEach((p) => {
        revalidatePathSafely(p, type);
      });
    } else if (resolver) {
      revalidatePathSafely(resolver, type);
    }
    return doc;
  };
}
