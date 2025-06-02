function Divider({ size = 2 }: { size?: number }) {
  return <div className={`border-t border-muted my-${size}`} />;
}

export default Divider;
