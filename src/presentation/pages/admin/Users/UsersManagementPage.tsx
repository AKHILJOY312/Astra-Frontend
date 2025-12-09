import PageBreadcrumb from "@/presentation/components/admin/common/PageBreadCrumb";
import ComponentCard from "@/presentation/components/admin/common/ComponentCard";
import PageMeta from "@/presentation/components/admin/common/PageMeta";
import UsersList from "@/presentation/components/admin/tables/BasicTables/UsersList";

export default function BasicTables() {
  return (
    <>
      <PageMeta
        title="Users Management | Admin can manage all users"
        description="Admin can manage all users"
      />
      <PageBreadcrumb pageTitle="User Management" />
      <div className="space-y-6">
        <ComponentCard title="List">
          <UsersList />
        </ComponentCard>
      </div>
    </>
  );
}
