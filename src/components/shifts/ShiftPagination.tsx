import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

interface ShiftPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const ShiftPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: ShiftPaginationProps) => {
  return (
    <Pagination className="mt-10">
      <PaginationContent>
        {/* ✅ Bouton Précédent avec hover long */}
        <PaginationItem>
          <PaginationLink
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className="cursor-pointer mr-10 px-11 py-3 rounded-lg border border-white/10 hover:bg-gray-700/80 hover:text-white transition-all duration-500 ease-in-out"
            isActive={false}
          >
            Précédent
          </PaginationLink>
        </PaginationItem>

        {/* ✅ Chiffres de la pagination (sans effet de hover spécial) */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === currentPage}
              onClick={() => onPageChange(page)}
              className="cursor-pointer"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* ✅ Bouton Suivant avec hover long */}
        <PaginationItem>
          <PaginationLink
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className="cursor-pointer ml-10 px-11 py-3 rounded-lg border border-white/10 hover:bg-gray-700/80 hover:text-white transition-all duration-500 ease-in-out"
            isActive={false}
          >
            Suivant
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
