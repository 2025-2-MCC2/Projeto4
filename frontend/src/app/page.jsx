'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import empathizeLogo from './assets/empathizeLogo-removebg-preview.png';

export default function Home() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={styles.container}>
            {/* Header/Navbar */}
            <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
                <div className={styles.headerContent}>
                    <div className={styles.logoSection}>
                        <Image 
                            src={empathizeLogo} 
                            alt="Empathize Logo" 
                            className={styles.logoImage}
                        />
                        <span className={styles.logoText}>Empathize</span>
                    </div>
                    <nav className={styles.nav}>
                        <a href="#sobre" className={styles.navLink}>Sobre</a>
                        <a href="#recursos" className={styles.navLink}>Recursos</a>
                        <a href="#impacto" className={styles.navLink}>Impacto</a>
                        <Link href="/login" className={styles.navLink}>Login</Link>
                        <Link href="/register" className={styles.btnPrimary}>
                            Registrar Grupo
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroBackground}>
                    <div className={styles.heroCircle1}></div>
                    <div className={styles.heroCircle2}></div>
                    <div className={styles.heroCircle3}></div>
                </div>
                
                <div className={styles.heroContent}>
                    <div className={styles.heroText}>
                        <h1 className={styles.heroTitle}>
                            Transforme <span className={styles.highlight}>Solidariedade</span> em Ação
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Plataforma completa para gerenciar projetos sociais, arrecadações e 
                            impacto comunitário. Conecte sua equipe, organize doações e faça a diferença.
                        </p>
                        <div className={styles.heroButtons}>
                            <Link href="/register" className={styles.btnHero}>
                                <span>🚀</span> Começar Agora
                            </Link>
                            <a href="#sobre" className={styles.btnSecondary}>
                                Saiba Mais
                            </a>
                        </div>
                        <div className={styles.heroStats}>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>500+</span>
                                <span className={styles.statLabel}>Grupos Ativos</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>10k+</span>
                                <span className={styles.statLabel}>Kg Arrecadados</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>1000+</span>
                                <span className={styles.statLabel}>Famílias Ajudadas</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.heroImage}>
                        <div className={styles.heroCard}>
                            <Image 
                                src={empathizeLogo} 
                                alt="Empathize System" 
                                className={styles.heroLogo}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Sobre Section */}
            <section id="sobre" className={styles.about}>
                <div className={styles.sectionContent}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionTag}>Sobre o Empathize</span>
                        <h2 className={styles.sectionTitle}>
                            Uma Plataforma Completa para Projetos Sociais
                        </h2>
                        <p className={styles.sectionDescription}>
                            O Empathize System foi desenvolvido para facilitar a gestão de projetos 
                            sociais, permitindo que grupos organizem arrecadações, acompanhem métricas 
                            e maximizem seu impacto na comunidade.
                        </p>
                    </div>

                    <div className={styles.featuresGrid}>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>👥</div>
                            <h3>Gestão de Grupos</h3>
                            <p>Organize sua equipe, gerencie integrantes e mantenha todos conectados.</p>
                        </div>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>📋</div>
                            <h3>Projetos</h3>
                            <p>Crie e gerencie múltiplos projetos sociais com facilidade.</p>
                        </div>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>📦</div>
                            <h3>Arrecadações</h3>
                            <p>Registre doações, acompanhe quantidades e valide comprovantes.</p>
                        </div>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>📊</div>
                            <h3>Métricas</h3>
                            <p>Visualize o impacto em tempo real com dashboards intuitivos.</p>
                        </div>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>🎯</div>
                            <h3>Mentoria</h3>
                            <p>Conecte-se com mentores experientes para orientação.</p>
                        </div>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>💚</div>
                            <h3>Impacto Social</h3>
                            <p>Transforme vidas e fortaleça comunidades através da solidariedade.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recursos Section */}
            <section id="recursos" className={styles.resources}>
                <div className={styles.sectionContent}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionTag}>Recursos</span>
                        <h2 className={styles.sectionTitle}>
                            Tudo que Você Precisa em Um Só Lugar
                        </h2>
                    </div>

                    <div className={styles.resourcesList}>
                        <div className={styles.resourceItem}>
                            <div className={styles.resourceContent}>
                                <h3>Dashboard Intuitivo</h3>
                                <p>
                                    Acesse todas as informações importantes em uma interface 
                                    limpa e fácil de usar. Visualize pontuações, arrecadações 
                                    e progresso do grupo em tempo real.
                                </p>
                                <ul className={styles.resourceFeatures}>
                                    <li>✓ Visualização em tempo real</li>
                                    <li>✓ Métricas detalhadas</li>
                                    <li>✓ Interface responsiva</li>
                                </ul>
                            </div>
                            <div className={styles.resourceImage}>
                                <div className={styles.mockupCard}>📊</div>
                            </div>
                        </div>

                        <div className={styles.resourceItem}>
                            <div className={styles.resourceImage}>
                                <div className={styles.mockupCard}>📦</div>
                            </div>
                            <div className={styles.resourceContent}>
                                <h3>Gestão de Arrecadações</h3>
                                <p>
                                    Registre doações de forma simples e eficiente. Upload de 
                                    comprovantes, validação por mentores e histórico completo 
                                    de todas as arrecadações.
                                </p>
                                <ul className={styles.resourceFeatures}>
                                    <li>✓ Comprovantes digitais</li>
                                    <li>✓ Sistema de aprovação</li>
                                    <li>✓ Histórico completo</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.resourceItem}>
                            <div className={styles.resourceContent}>
                                <h3>Colaboração em Equipe</h3>
                                <p>
                                    Trabalhe em conjunto com todos os membros do grupo. 
                                    Compartilhe projetos, atualizações e mantenha todos 
                                    informados sobre o progresso.
                                </p>
                                <ul className={styles.resourceFeatures}>
                                    <li>✓ Múltiplos integrantes</li>
                                    <li>✓ Projetos compartilhados</li>
                                    <li>✓ Comunicação facilitada</li>
                                </ul>
                            </div>
                            <div className={styles.resourceImage}>
                                <div className={styles.mockupCard}>👥</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impacto Section */}
            <section id="impacto" className={styles.impact}>
                <div className={styles.sectionContent}>
                    <div className={styles.impactContent}>
                        <div className={styles.impactText}>
                            <span className={styles.sectionTag}>Nosso Impacto</span>
                            <h2 className={styles.sectionTitle}>
                                Juntos, Fazemos a Diferença
                            </h2>
                            <p className={styles.impactDescription}>
                                Cada grupo registrado, cada projeto criado e cada quilo arrecadado 
                                representa uma família ajudada, uma vida transformada. O Empathize 
                                System potencializa o impacto de ações sociais através da tecnologia.
                            </p>
                            <div className={styles.impactMetrics}>
                                <div className={styles.metricBox}>
                                    <span className={styles.metricValue}>10 toneladas</span>
                                    <span className={styles.metricLabel}>de alimentos doados</span>
                                </div>
                                <div className={styles.metricBox}>
                                    <span className={styles.metricValue}>50+ comunidades</span>
                                    <span className={styles.metricLabel}>impactadas</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.impactVisual}>
                            <div className={styles.impactCard}>
                                <div className={styles.impactIcon}>💚</div>
                                <h4>Transformando Vidas</h4>
                                <p>Através da solidariedade organizada</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.cta}>
                <div className={styles.ctaContent}>
                    <h2 className={styles.ctaTitle}>
                        Pronto para Fazer a Diferença?
                    </h2>
                    <p className={styles.ctaDescription}>
                        Registre seu grupo agora e comece a transformar vidas através da solidariedade organizada.
                    </p>
                    <Link href="/register" className={styles.btnCta}>
                        Registrar Meu Grupo Agora
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.footerSection}>
                        <div className={styles.footerLogo}>
                            <Image 
                                src={empathizeLogo} 
                                alt="Empathize Logo" 
                                className={styles.footerLogoImage}
                            />
                            <span>Empathize System</span>
                        </div>
                        <p className={styles.footerDescription}>
                            Transformando solidariedade em ação através da tecnologia.
                        </p>
                    </div>
                    <div className={styles.footerSection}>
                        <h4>Links Rápidos</h4>
                        <ul className={styles.footerLinks}>
                            <li><a href="#sobre">Sobre</a></li>
                            <li><a href="#recursos">Recursos</a></li>
                            <li><a href="#impacto">Impacto</a></li>
                            <li><Link href="/register">Registrar</Link></li>
                        </ul>
                    </div>
                    <div className={styles.footerSection}>
                        <h4>Contato</h4>
                        <ul className={styles.footerLinks}>
                            <li>📧 contato@empathize.com</li>
                            <li>📱 (11) 9999-9999</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.footerBottom}>
                    <p>© 2025 Empathize System. Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    );
}
