import Image from 'next/image';

const LIONS_LOGO = 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5b/Lions_Clubs_International_logo.svg/250px-Lions_Clubs_International_logo.svg.png';
const LEO_LOGO   = 'https://upload.wikimedia.org/wikipedia/en/thumb/3/39/Leo_clubs_logo.svg/250px-Leo_clubs_logo.svg.png';

const LIONS_IMAGE = '/lions-history.webp';
const LEO_IMAGE   = 'https://live.staticflickr.com/65535/49318090251_648f6034f2_b.jpg';

export default function AboutOrgs() {
  return (
    <section className="bg-[#020202] py-16 md:py-32 border-t border-white/5">
      <div className="container mx-auto px-6">

        {/* Lions International */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-20 md:mb-40">

          {/* Text */}
          <div>
            <div className="flex items-center gap-5 mb-10">
              <div className="w-28 h-28 flex items-center justify-center flex-shrink-0">
                <Image
                  src={LIONS_LOGO}
                  alt="Lions Clubs International"
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-red-500 uppercase tracking-[0.4em] text-[9px] block mb-1">Founded 1917 · Chicago, USA</span>
                <h2 className="text-2xl md:text-4xl font-heading font-black text-white uppercase tracking-tighter leading-none">
                  Lions Clubs<br />International
                </h2>
              </div>
            </div>

            <p className="text-white text-base leading-relaxed tracking-tight mb-5">
              Lions Clubs International (LCI) is the world&apos;s largest service club organization, founded by Melvin Jones with a simple yet powerful motto: <span className="text-white">&ldquo;We Serve.&rdquo;</span> United in their mission to meet humanitarian needs, encourage peace, and foster international understanding.
            </p>
            <p className="text-white text-base leading-relaxed tracking-tight mb-10">
              Lions clubs address urgent global and local challenges through eight core causes: Vision, Hunger, Environment, Childhood Cancer, Youth, Disaster Relief, Diabetes, and Humanitarian. Since 1968, the Lions Clubs International Foundation (LCIF) has awarded over <span className="text-white">$1.3 billion</span> in grants to support humanitarian projects worldwide.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/5">
              {[
                { value: '1.4M+', label: 'Members' },
                { value: '48,000+', label: 'Clubs' },
                { value: '210+', label: 'Countries' },
              ].map(s => (
                <div key={s.label}>
                  <div className="text-3xl md:text-4xl font-heading font-black text-white mb-1">{s.value}</div>
                  <div className="text-[11px] font-black uppercase tracking-[0.3em] text-ink-muted">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/5">
            <Image
              src={LIONS_IMAGE}
              alt="Lions Clubs International chartering its 20,000th club"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 flex items-center gap-2 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
              <Image src={LIONS_LOGO} alt="LCI" width={20} height={20} className="object-contain" />
              <span className="text-[9px] font-black uppercase tracking-widest text-white">We Serve</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mb-20 md:mb-40" />

        {/* Leo Club Programme */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* Image left on desktop */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/5 order-2 lg:order-1">
            <Image
              src={LEO_IMAGE}
              alt="Leo Club members at a community event"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 flex items-center gap-2 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
              <Image src={LEO_LOGO} alt="Leo" width={20} height={20} className="object-contain" />
              <span className="text-[9px] font-black uppercase tracking-widest text-white">Leadership · Experience · Opportunity</span>
            </div>
          </div>

          {/* Text right on desktop */}
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-28 h-28 flex items-center justify-center flex-shrink-0">
                <Image
                  src={LEO_LOGO}
                  alt="Leo Club Programme"
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-red-500 uppercase tracking-[0.4em] text-[9px] block mb-1">Founded 1957 · Pennsylvania, USA</span>
                <h2 className="text-2xl md:text-4xl font-heading font-black text-white uppercase tracking-tighter leading-none">
                  The Leo Club<br />Programme
                </h2>
              </div>
            </div>

            <p className="text-white text-base leading-relaxed tracking-tight mb-5">
              <span className="text-white">LEO</span> stands for Leadership, Experience, Opportunity. It is the official youth programme of Lions Clubs International, founded in 1957 by Jim Graver and the Glenside Lions Club in Pennsylvania. It gives young people aged 12 to 30 the platform to develop as responsible leaders through meaningful community service.
            </p>
            <p className="text-white text-base leading-relaxed tracking-tight mb-10">
              <span className="text-white">Alpha Leo clubs</span> welcome members aged 12 to 18, while <span className="text-white">Omega Leo clubs</span> serve those aged 18 to 30. Leos plan and implement service projects, collaborate with United Nations initiatives, and develop skills that last a lifetime.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/5">
              {[
                { value: '200K+', label: 'Leos' },
                { value: '7,700+', label: 'Clubs' },
                { value: '150+', label: 'Countries' },
              ].map(s => (
                <div key={s.label}>
                  <div className="text-3xl md:text-4xl font-heading font-black text-white mb-1">{s.value}</div>
                  <div className="text-[11px] font-black uppercase tracking-[0.3em] text-ink-muted">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
