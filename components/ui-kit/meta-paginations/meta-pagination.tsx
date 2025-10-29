import { useMemo } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink
} from '../../ui/pagination'
import { usePagination } from './hook/use-pagination'
import { SelectPerPageItem } from './toolkit/select-per-page-Item'
import { cn } from '@/lib/utils'

type PaginationTypes = {
  total: number
  value: number
  onChange: (prop: number) => void
  siblings?: number
  boundaries?: number
  recordPerPage: number
}

export const MetaPagination = ({
  total,
  siblings = 0,
  boundaries = 1,
  value,
  onChange,
  recordPerPage
}: PaginationTypes) => {
  const totalPages = useMemo(() => {
    if (recordPerPage <= 0) {
      throw new Error('Items per page must be greater than zero.')
    }
    return Math.ceil(total / recordPerPage)
  }, [total, recordPerPage])

  const pagination = usePagination({
    total: totalPages,
    page: value,
    onChange: onChange,
    siblings: siblings,
    boundaries: boundaries
  })

  const changePage = (prop: number) => {
    if (prop !== value) pagination.setPage(prop)
  }

  const handlePrevious = () => {
    if (value > 1) pagination.previous()
  }

  const handleNext = () => {
    if (value < totalPages) pagination.next()
  }

  return (
    <Pagination className="w-auto mx-0">
      <PaginationContent className="gap-5">
        {/* Previous Button */}
        <PaginationItem
          className={cn({
            'opacity-50 cursor-not-allowed': value === 1
          })}
        >
          <PaginationLink
            onClick={handlePrevious}
            aria-disabled={value === 1}
            className={cn({ 'cursor-pointer': value === 1 })}
            style={{ display: 'unset' }}
          >
            Previous
          </PaginationLink>
        </PaginationItem>

        {/* Page Numbers */}
        {pagination.range.map((item, index) => (
          <PaginationItem key={index} className='cursor-pointer'>
            {item === 'dots' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={() => changePage(item)}
                isActive={item === pagination.active}
                className={cn({
                  'pointer-events-none opacity-50': item === pagination.active
                })}
              >
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next Button */}
        <PaginationItem
          className={cn({
            'opacity-50 cursor-not-allowed': value === totalPages
          })}
        >
          <PaginationLink
            onClick={handleNext}
            aria-disabled={value === totalPages}
            className={cn({ 'pointer-events-none': value === totalPages })}
          >
            Next
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

MetaPagination.PerPage = SelectPerPageItem
