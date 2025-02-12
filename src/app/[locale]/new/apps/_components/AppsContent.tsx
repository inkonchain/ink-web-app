"use client";

import { useCallback, useMemo, useState } from "react";
import { Button } from "@inkonchain/ink-kit";
import { useSearchParams } from "next/navigation";

import { InfiniteScrollContainer } from "@/components/InfiniteScrollContainer";
import { SearchInput } from "@/components/SearchBar/SearchInput";
import { useOnWindowSize } from "@/hooks/useOnWindowSize";
import { useRouter } from "@/routing";

import { AppMainnetToggle } from "./AppMainnetToggle";
import { AppsCategoryFilter } from "./AppsCategoryFilter";
import { AppsGrid } from "./AppsGrid";
import { AppsTagsFilter } from "./AppsTagsFilter";
import {
  InkAppFilters,
  InkAppNetwork,
  inkApps,
  inkFeaturedApps,
} from "./InkApp";

interface AppsContentProps {
  currentCategory?: string;
}

export function AppsContent({ currentCategory }: AppsContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const network = getNetwork(searchParams.get("network"));
  const category = currentCategory || searchParams.get("category");
  const tags = searchParams.get("tags");

  const [page, setPage] = useState(0);
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<Omit<InkAppFilters, "search">>({
    categories: category ? category.split(",") : [],
    tags: tags ? tags.split(",") : [],
    network: network ? network : "Mainnet",
  });

  const filteredAppsWithoutSearchTerms = useMemo(
    () =>
      inkApps.filter((app) => {
        if (
          filters.network === "Mainnet" &&
          app.network !== "Mainnet" &&
          app.network !== "Both"
        )
          return false;
        if (
          filters.network === "Testnet" &&
          app.network !== "Testnet" &&
          app.network !== "Both"
        )
          return false;

        if (
          filters.categories.length > 0 &&
          !app.category.some((category) =>
            filters.categories.includes(category.toLowerCase())
          )
        )
          return false;

        if (
          filters.tags.length > 0 &&
          !app.tags.some((tag) => filters.tags.includes(tag))
        )
          return false;

        return true;
      }),
    [filters]
  );

  const filteredApps = useMemo(
    () =>
      filteredAppsWithoutSearchTerms.filter((app) => {
        const searchTerm = search.toLowerCase();
        if (
          searchTerm &&
          !app.name.toLowerCase().includes(searchTerm) &&
          !app.description.toLowerCase().includes(searchTerm) &&
          !app.category.some((category) =>
            category.toLowerCase().includes(searchTerm)
          ) &&
          !app.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
        )
          return false;
        return true;
      }),
    [filteredAppsWithoutSearchTerms, search]
  );

  const updateSearchParams = useCallback(
    (newParams: Record<string, string>) => {
      const { network, category, tags, ...params } = Object.fromEntries(
        searchParams.entries()
      );
      const { category: newCategory, ...newParamsToUpdate } = newParams;
      const queryParams = new URLSearchParams({
        ...params,
        ...newParamsToUpdate,
      });
      // Doing this manually is *insanely* faster than using router.replace for some reason.
      window.history.pushState(
        null,
        "",
        `/new/apps${newCategory ? `/${newCategory}` : ""}?${queryParams}`
      );
    },
    [searchParams]
  );
  const updateFilters = useCallback(
    (newFilters: Partial<InkAppFilters>) => {
      setFilters((prevFilters) => {
        const mergedFilters = { ...prevFilters, ...newFilters };

        updateSearchParams({
          ...(mergedFilters.network && mergedFilters.network !== "Mainnet"
            ? { network: mergedFilters.network }
            : {}),
          ...(mergedFilters.tags && mergedFilters.tags.length > 0
            ? { tags: mergedFilters.tags.join(",") }
            : {}),
          ...(mergedFilters.categories && mergedFilters.categories.length > 0
            ? { category: mergedFilters.categories[0] }
            : {}),
        });

        setPage(0);
        return mergedFilters;
      });
    },
    [updateSearchParams]
  );

  const hasActiveFilters = (filters: InkAppFilters): boolean => {
    return (
      !!search ||
      (filters.network && filters.network !== "Mainnet") ||
      (filters.categories && filters.categories.length > 0) ||
      (filters.tags && filters.tags.length > 0)
    );
  };

  const appsToDisplay = useMemo(
    () => filteredApps.slice(0, (page + 1) * 10),
    [filteredApps, page]
  );

  const isUnderDesktopWindowSize = useOnWindowSize({ size: "xl" });

  return (
    <>
      <div className="flex flex-col gap-6 w-full">
        {/* Floating section on desktop */}
        <div className="lg:fixed lg:flex left-[20%] right-[20%] top-8 justify-center flex-wrap gap-4 mx-4 z-10">
          <SearchInput
            className="max-w-md"
            placeholder="Search"
            disabled={isUnderDesktopWindowSize}
            value={search}
            onValueChange={setSearch}
          />
        </div>

        <div className="mx-4 flex items-center justify-between gap-4 flex-col sm:flex-row flex-1">
          <AppsCategoryFilter
            selected={filters.categories?.[0]}
            setSelected={(value) => {
              updateFilters({
                categories: value ? [value] : [],
              });
            }}
          />
          <div className="flex gap-2">
            <AppsTagsFilter
              selected={filters.tags}
              setSelected={(value) => {
                updateFilters({
                  tags: value,
                });
              }}
            />
            <AppMainnetToggle
              value={filters.network || "Mainnet"}
              onChange={(value) => {
                updateFilters({ network: value });
              }}
            />
          </div>
        </div>

        {/* Main flexbox */}
        <div className="flex gap-8 flex-col-reverse 2xl:flex-row">
          <div className="flex flex-col gap-4">
            <InfiniteScrollContainer
              className="flex px-4 pr-2 lg:pr-4 xl:pr-0"
              onLoadMore={() => setPage(page + 1)}
              hasMore={page < Math.floor(filteredApps.length / 10)}
            >
              <AppsGrid
                apps={appsToDisplay}
                featuredApps={inkFeaturedApps}
                noAppsFound={
                  <NoAppsFound
                    hasSearch={!!search}
                    resetSearch={() => setSearch("")}
                    hasActiveFilters={hasActiveFilters(filters)}
                    resetFilters={() => {
                      updateFilters({
                        network: "Mainnet",
                        categories: [],
                        tags: [],
                      });
                    }}
                  />
                }
                network={network}
              />
            </InfiniteScrollContainer>
          </div>
        </div>
      </div>
    </>
  );
}

function getNetwork(networkSearchParam: string | null): InkAppNetwork {
  if (networkSearchParam === "Both" || networkSearchParam === "Testnet") {
    return networkSearchParam;
  }

  return "Mainnet";
}

function NoAppsFound({
  hasSearch,
  hasActiveFilters,
  resetFilters,
  resetSearch,
}: {
  hasSearch: boolean;
  hasActiveFilters: boolean;
  resetFilters: () => void;
  resetSearch: () => void;
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-6">
        <div className="text-h5 font-bold text-blackMagic dark:text-whiteMagic">
          No matches found
        </div>
        <div className="text-body-2 text-blackMagic/50 dark:text-whiteMagic/50 text-center">
          {`Please change your keywords${
            hasActiveFilters ? " or reset your filters" : ""
          } and try again`}
        </div>
      </div>
      {(hasActiveFilters || hasSearch) && (
        <Button
          variant="primary"
          size="lg"
          onClick={() => {
            if (hasActiveFilters) {
              resetFilters();
            } else {
              resetSearch();
            }
          }}
        >
          {hasActiveFilters ? "Reset Filters" : "Clear Keywords"}
        </Button>
      )}
    </div>
  );
}
