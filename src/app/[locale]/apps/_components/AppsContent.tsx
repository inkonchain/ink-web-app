"use client";

import { useCallback, useMemo, useState } from "react";
import { Button } from "@inkonchain/ink-kit";
import { useSearchParams } from "next/navigation";

import { ColoredText } from "@/components/ColoredText";
import { InfiniteScrollContainer } from "@/components/InfiniteScrollContainer";
import { SearchInput } from "@/components/SearchBar/SearchInput";

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
import { SubmitAppButton } from "./SubmitAppButton";

interface AppsContentProps {
  currentCategory?: string;
}

function hasActiveFilters(filters: InkAppFilters): boolean {
  return (
    (filters.network && filters.network !== "Mainnet") ||
    (filters.categories && filters.categories.length > 0) ||
    (filters.tags && filters.tags.length > 0)
  );
}

function hasActiveFiltersOrSearch(filters: InkAppFilters): boolean {
  return !!filters.search || hasActiveFilters(filters);
}

export function AppsContent({ currentCategory }: AppsContentProps) {
  const searchParams = useSearchParams();
  const network = getNetwork(searchParams.get("network"));
  const category = currentCategory || searchParams.get("category");
  const tags = searchParams.get("tags");
  const search = searchParams.get("search");
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState<InkAppFilters>({
    search: search || "",
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

        if (hasActiveFiltersOrSearch(filters)) {
          if (
            inkFeaturedApps.some((featuredApp) => featuredApp.id === app.id)
          ) {
            return true;
          }
        }

        return true;
      }),
    [filters]
  );

  const filteredApps = useMemo(
    () =>
      filteredAppsWithoutSearchTerms.filter((app) => {
        const searchTerm = filters.search.toLowerCase();
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
    [filteredAppsWithoutSearchTerms, filters.search]
  );

  const updateSearchParams = useCallback(
    (newParams: Record<string, string>) => {
      const {
        network,
        category,
        tags,
        search: _search,
        ...params
      } = Object.fromEntries(searchParams.entries());
      const { category: newCategory, ...newParamsToUpdate } = newParams;
      const queryParams = new URLSearchParams({
        ...params,
        ...newParamsToUpdate,
      });
      // Doing this manually is *insanely* faster than using router.replace for some reason.
      window.history.pushState(
        null,
        "",
        `/apps${newCategory ? `/${newCategory}` : ""}?${queryParams}`
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
          ...(mergedFilters.search && mergedFilters.search.length > 0
            ? { search: mergedFilters.search }
            : {}),
        });

        setPage(0);
        return mergedFilters;
      });
    },
    [updateSearchParams]
  );

  const appsToDisplay = useMemo(
    () => filteredApps.slice(0, (page + 1) * 10),
    [filteredApps, page]
  );

  return (
    <>
      <div className="flex items-center justify-between w-full lg:hidden">
        <ColoredText className="ink:text-h2" variant="purple">
          Apps
        </ColoredText>
        <SubmitAppButton />
      </div>
      <div className="flex flex-col gap-6 w-full">
        {/* Floating section on desktop */}
        <div className="lg:fixed lg:flex left-[20%] right-[20%] top-4 justify-center flex-wrap gap-4 z-20">
          <SearchInput
            className="max-w-md"
            placeholder="Search"
            value={filters.search}
            onValueChange={(value) => {
              updateFilters({ search: value });
            }}
          />
        </div>

        <div className="flex items-center justify-between gap-4 flex-col sm:flex-row flex-1">
          <AppsCategoryFilter
            selected={filters.categories?.[0]}
            setSelected={(value) => {
              updateFilters({
                categories: value ? [value] : [],
              });
            }}
          />
          <div className="flex items-center gap-2">
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
            <div className="hidden lg:flex">
              <SubmitAppButton />
            </div>
          </div>
        </div>

        {/* Main flexbox */}
        <div className="flex gap-8 flex-col-reverse 2xl:flex-row">
          <div className="flex flex-col gap-4">
            <InfiniteScrollContainer
              className="flex"
              onLoadMore={() => setPage(page + 1)}
              hasMore={page < Math.floor(filteredApps.length / 10)}
            >
              <AppsGrid
                apps={appsToDisplay}
                featuredApps={
                  !hasActiveFiltersOrSearch(filters) ? inkFeaturedApps : []
                }
                noAppsFound={
                  <NoAppsFound
                    hasSearch={!!filters.search}
                    resetSearch={() => updateFilters({ search: "" })}
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
        <div className="ink:text-h5 font-bold ink:text-text-default">
          No matches found
        </div>
        <div className="ink:text-body-2-regular ink:text-text-muted text-center">
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
