"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import { Button } from "@inkonchain/ink-kit";
import { useSearchParams } from "next/navigation";

import { ColoredText } from "@/components/ColoredText";
import { InfiniteScrollContainer } from "@/components/InfiniteScrollContainer";
import { SearchInput } from "@/components/SearchBar/SearchInput";
import { useOnWindowSize } from "@/hooks/useOnWindowSize";
import { useRouter } from "@/routing";
import { classNames } from "@/util/classes";
import { isMobileUserAgent } from "@/util/detection";

import { AddYourAppButton } from "./AddYourAppButton";
import { AppCard } from "./AppCard";
import { AppMainnetToggle } from "./AppMainnetToggle";
import { AppsCategoryFilter } from "./AppsCategoryFilter";
import { AppsSideBar } from "./AppsSideBar";
import { AppsTable } from "./AppsTable";
import { AppsTagsFilter } from "./AppsTagsFilter";
import {
  InkAppFilters,
  InkAppNetwork,
  inkApps,
  inkFeaturedApps,
} from "./InkApp";
import { RelayKitUI } from "./RelayKitUI";

import "react-multi-carousel/lib/styles.css";
import "./AppsContent.scss";

interface AppsContentProps {
  newLayout?: boolean;
  currentCategory?: string;
}

export function AppsContent({ newLayout, currentCategory }: AppsContentProps) {
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

  const carouselRef = useRef<Carousel>(null);
  const isMobileWindowSize = useOnWindowSize({ size: "sm" });
  const isUnderDesktopWindowSize = useOnWindowSize({ size: "xl" });

  // If some variables change and we are scrolled, we sometimes get stuck on a slide that is not visible.
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.goToSlide(0);
    }
  }, [filteredApps, isMobileWindowSize]);
  const updateSearchParams = useCallback(
    (newParams: Record<string, string>) => {
      const { network, category, tags, ...params } = Object.fromEntries(
        searchParams.entries()
      );
      const { category: newCategory, ...newParamsToUpdate } = newParams;
      router.replace(
        {
          pathname: newLayout ? `/new/dashboard/[category]` : "/dashboard",
          params: {
            category: newCategory || "",
          },
          query: {
            ...params,
            ...newParamsToUpdate,
            ...(newLayout ? {} : { category: newCategory }),
          },
        },
        {
          scroll: false,
        }
      );
    },
    [newLayout, searchParams, router]
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
            ? { tags: mergedFilters.tags[0] }
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

  const isMobile = isMobileUserAgent();

  const categoryLabels: Record<string, string> = {
    bridge: "Bridge to Ink",
    defi: "Discover the best DeFi apps on Ink",
    explorers: "Discover the best explorers on Ink",
    infra: "Discover the best infrastructure on Ink",
    social: "Discover the best social apps on Ink",
    "on-ramps": "Discover the best on-ramps on Ink",
    other: "Discover the best on-ramps on Ink",
  };

  const title =
    filters.categories.length === 1
      ? categoryLabels[filters.categories[0]]
      : `Discover the best on Ink`;

  const hasActiveFilters = (filters: InkAppFilters) => {
    return (
      search ||
      (filters.network && filters.network !== "Mainnet") ||
      (filters.categories && filters.categories.length > 0) ||
      (filters.tags && filters.tags.length > 0)
    );
  };

  const appsToDisplay = useMemo(
    () => filteredApps.slice(0, (page + 1) * 10),
    [filteredApps, page]
  );

  return (
    <>
      <div
        className={classNames(
          "hidden xl:fixed xl:flex left-[20%] right-[20%] top-8 justify-center flex-wrap gap-4 mx-4 z-10",
          newLayout ? "top-24" : "top-8"
        )}
      >
        <div>
          <SearchInput
            className="max-w-md"
            placeholder="Search"
            disabled={isUnderDesktopWindowSize}
            value={search}
            onValueChange={setSearch}
          />
        </div>
        <div>
          <AppMainnetToggle
            value={filters.network ?? "Both"}
            onChange={(value) => {
              updateFilters({
                network: value,
              });
            }}
          />
        </div>
        <div className="min-w-[240px] xl:hidden">
          <AppsCategoryFilter
            newLayout={newLayout}
            selected={filters.categories?.[0]}
            setSelected={(value) => {
              updateFilters({
                categories: value ? [value] : [],
              });
            }}
          />
        </div>
        <div>
          <AppsTagsFilter
            selected={filters.tags}
            setSelected={(value) => {
              updateFilters({
                tags: value || [],
              });
            }}
          />
        </div>
      </div>

      <div className="h-full hidden lg:block shrink-0 fixed left-8 w-[240px]">
        <div className="hide-on-very-narrow-screen">
          <AppsSideBar
            newLayout={newLayout}
            selected={filters.categories?.[0] ?? null}
            setSelected={(value) => {
              updateFilters({
                categories: value ? [value] : [],
              });
            }}
          />
        </div>
        <div className="hidden show-on-very-narrow-screen">
          <AppsCategoryFilter
            newLayout={newLayout}
            selected={filters.categories?.[0]}
            setSelected={(value) => {
              updateFilters({
                categories: value ? [value] : [],
              });
            }}
          />
        </div>
      </div>
      <div className="hidden lg:block shrink-0 fixed left-8 bottom-10 w-[240px]">
        <AddYourAppSection className="flex-col items-start" />
      </div>
      <div className="gap-4 xl:gap-8 w-full grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] lg:pl-8">
        <div className="hidden lg:block" />

        <div className="flex flex-col gap-8 w-full xl:mx-auto xl:pr-8 max-w-[2000px]">
          <div className="mx-6 min-w-[240px] flex items-center lg:hidden flex-wrap gap-2">
            <div className="w-min">
              <AppsCategoryFilter
                newLayout={newLayout}
                selected={filters.categories?.[0]}
                setSelected={(value) => {
                  updateFilters({
                    categories: value ? [value] : [],
                  });
                }}
              />
            </div>
            <div>
              <AppsTagsFilter
                selected={filters.tags}
                setSelected={(value) => {
                  updateFilters({
                    tags: value,
                  });
                }}
              />
            </div>
          </div>

          <div className={classNames("flex flex-wrap gap-2 mx-6 xl:hidden")}>
            <div>
              <SearchInput
                className="max-w-md"
                placeholder="Search"
                disabled={!isUnderDesktopWindowSize}
                value={search}
                onValueChange={setSearch}
              />
            </div>
            <div>
              <AppMainnetToggle
                value={filters.network ?? "Both"}
                onChange={(value) => {
                  updateFilters({
                    network: value,
                  });
                }}
              />
            </div>
            <div className="hidden lg:block">
              <AppsTagsFilter
                selected={filters.tags}
                setSelected={(value) => {
                  updateFilters({
                    tags: value,
                  });
                }}
              />
            </div>
          </div>

          <div
            className={classNames(
              "flex justify-between w-full flex-wrap gap-8",
              hasActiveFilters(filters) && "hidden lg:flex",
              newLayout ? "xl:pt-16" : ""
            )}
          >
            <div className="flex flex-col gap-2 mx-6">
              <div className="text-body-2 text-blackMagic/50 dark:text-whiteMagic/50">
                Dashboard
              </div>
              <ColoredText
                variant="purple"
                className="text-h2 font-medium leading-tight"
              >
                {title}
              </ColoredText>
            </div>
          </div>

          {/* Main flexbox */}
          <div className="flex gap-8 flex-col-reverse 2xl:flex-row">
            {/* Apps carousel & table */}
            <div className="flex-1 flex flex-col gap-12 overflow-x-hidden">
              {!search && (
                <div className="flex flex-col gap-4">
                  <div className="lg:pl-4">
                    <Carousel
                      ref={carouselRef}
                      containerClass="w-full"
                      arrows={false}
                      ssr
                      partialVisible
                      responsive={{
                        desktop: {
                          breakpoint: { max: 6000, min: 1024 },
                          items: 3,
                        },
                        tablet: {
                          breakpoint: { max: 1280, min: 464 },
                          items: 2,
                          partialVisibilityGutter: 20,
                        },
                        tabletSmall: {
                          breakpoint: { max: 1024, min: 640 },
                          items: 2,
                          partialVisibilityGutter: 20,
                        },
                        mobile: {
                          breakpoint: { max: 640, min: 0 },
                          items: 1,
                          partialVisibilityGutter: 20,
                        },
                      }}
                      deviceType={isMobile ? "mobile" : "desktop"}
                      itemClass="px-4 lg:first:pl-0 lg:last:pr-4 xl:last:pr-0 select-none"
                    >
                      {inkFeaturedApps.map((app) => (
                        <AppCard key={app.id} app={app} network={network} />
                      ))}
                    </Carousel>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-4 w-full">
                <InfiniteScrollContainer
                  className="flex px-4 pr-2 lg:pr-4 xl:pr-0"
                  onLoadMore={() => setPage(page + 1)}
                  hasMore={page < Math.floor(filteredApps.length / 10)}
                >
                  <AppsTable
                    apps={appsToDisplay}
                    noAppsFound={
                      <div className="flex flex-col gap-8">
                        <div className="flex flex-col items-center gap-6">
                          <div className="text-h5 font-bold text-blackMagic dark:text-whiteMagic">
                            No matches found
                          </div>
                          <div className="text-body-2 text-blackMagic/50 dark:text-whiteMagic/50 text-center">
                            {`Please change your keywords${
                              hasActiveFilters(filters)
                                ? " or reset your filters"
                                : ""
                            } and try again`}
                          </div>
                        </div>
                        {(hasActiveFilters(filters) || search) && (
                          <Button
                            variant="primary"
                            size="lg"
                            onClick={() => {
                              if (hasActiveFilters(filters)) {
                                updateFilters({
                                  network: "Mainnet",
                                  categories: [],
                                  tags: [],
                                });
                              } else {
                                setSearch("");
                              }
                            }}
                          >
                            {hasActiveFilters(filters)
                              ? "Reset Filters"
                              : "Clear Keywords"}
                          </Button>
                        )}
                      </div>
                    }
                    network={network}
                  />
                </InfiniteScrollContainer>
              </div>

              <div className="mx-6 lg:hidden">
                <AddYourAppSection />
              </div>
            </div>

            {/* Bridge Widget */}
            <div
              className={classNames(
                "flex-grow-0 flex-shrink basis-[420px] py-6 2xl:py-0 px-4 sm:px-0",
                hasActiveFilters(filters) &&
                  !filters.categories.includes("bridge") &&
                  "hidden 2xl:block"
              )}
            >
              <div className="sticky top-28">
                <RelayKitUI />
              </div>
            </div>
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

function AddYourAppSection({ className }: { className?: string }) {
  return (
    <div
      className={classNames(
        "flex items-center gap-6 p-6 border border-blackMagic/10 dark:border-whiteMagic/10 rounded-3xl",
        className
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="text-body font-semibold">Submit your app</div>
        <div className="text-body-3 text-blackMagic/50 dark:text-whiteMagic/50">
          Have an app on Ink you want to share with the world? Add your app and
          get more Ink flowing your way.
        </div>
      </div>
      <div>
        <AddYourAppButton />
      </div>
    </div>
  );
}
