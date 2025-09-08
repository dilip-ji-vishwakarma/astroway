import { useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "../../ui/pagination";
import { usePagination } from "./hook/use-pagination";
import { SelectPerPageItem } from "./toolkit/select-per-page-Item";
import { cn } from "@/lib/utils";

type PaginationTypes = {
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  onChange: (page: number) => void;
};
export const MetaPagination = ({
 pagination: { total, page, limit, totalPages },
  onChange,
}: PaginationTypes) => {

 const pagination = usePagination({
    total: totalPages,
    page: page,
    onChange: onChange,
    siblings: 0,
    boundaries: 1,
  });

  const changePage = (prop: number) => {
    pagination.setPage(prop);
  };

  return (
    <Pagination className="justify-start">
      <PaginationContent>
        {/* Previous */}
        <PaginationItem className={cn({ "opacity-50 cursor-auto": page === 1 })}>
          <PaginationLink
            className="text-[#777777] w-auto text-[16px] px-2 text-hover:[#387bd2]"
            onClick={() => pagination.previous()}
          >
            Previous
          </PaginationLink>
        </PaginationItem>

        {/* Numbers */}
        {pagination.range.map((item, index) => (
          <PaginationItem key={index}>
            {item === "dots" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                  onClick={() => changePage(item)}
                  key={index}
                  isActive={item === pagination.active}
                >
                  {item}
                </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem
          className={cn({ "opacity-50 cursor-auto": page === totalPages })}
        >
          <PaginationLink
            className="text-[#777777] w-auto text-[16px] px-2 text-hover:[#387bd2]"
            onClick={() => pagination.next()}
          >
            Next
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

MetaPagination.PerPage = SelectPerPageItem;