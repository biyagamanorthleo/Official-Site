import MemberForm from '../MemberForm';

export default function NewMemberPage() {
  return (
    <div className="max-w-lg">
      <div className="mb-10">
        <h1 className="text-3xl font-heading font-black text-white uppercase tracking-tighter">Add Member</h1>
        <p className="text-ink-muted text-xs font-bold uppercase tracking-widest mt-1">
          Creates an account and sends a setup email automatically
        </p>
      </div>
      <MemberForm />
    </div>
  );
}
